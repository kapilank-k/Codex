import multer from 'multer';
import mammoth from 'mammoth';
import pdfParse from 'pdf-parse';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const upload = multer({ storage: multer.memoryStorage() });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// In-memory doc store for demo purposes
const DOCS = new Map(); // docId -> { text, headings }

function extractHeadingsFromDocx(html) {
  // Mammoth returns HTML with <p> etc. Basic heuristic for headings:
  // Look for strong/bold lines or "Heading" styles if present in style map output.
  const tmp = document ? document.createElement('div') : null; // if server has no DOM, do a rough regex fallback
  const headings = [];
  const matches = html.match(/<p[^>]*>(.*?)<\/p>/g) || [];
  for (const m of matches) {
    const t = m.replace(/<[^>]+>/g, '').trim();
    if (!t) continue;
    // naive: very short lines or lines with Title Case → treat as heading
    if (t.length <= 80 && /^[A-Z].+/.test(t)) headings.push({ level: 2, title: t });
  }
  return headings;
}

function extractHeadingsFromPdfText(text) {
  const lines = text.split(/\r?\n/);
  const headings = [];
  for (const raw of lines) {
    const t = raw.trim();
    if (!t) continue;
    // Heuristic: short lines, Title Case or ALL CAPS, no trailing punctuation
    const isShort = t.length <= 80;
    const isAllCaps = t === t.toUpperCase() && /[A-Z]/.test(t);
    const isTitleCase = /^[A-Z][a-z0-9]+(\s+[A-Z][a-z0-9]+)*$/.test(t);
    const noEndPunct = !/[.:;]$/.test(t);
    if (isShort && noEndPunct && (isAllCaps || isTitleCase)) {
      headings.push({ level: 2, title: t });
    }
  }
  return headings;
}

// Upload endpoint
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No file provided' });

    let text = '';
    let headings = [];

    if (file.mimetype === 'application/pdf') {
      const pdf = await pdfParse(file.buffer);
      text = pdf.text || '';
      headings = extractHeadingsFromPdfText(text);
    } else if (
      file.mimetype === 'application/msword' ||
      file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      const result = await mammoth.convertToHtml({ buffer: file.buffer });
      const html = result.value || '';
      // DOCX: get plain text as well for LLM grounding
      const plain = (html || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      text = plain;
      headings = extractHeadingsFromDocx(html);
    } else {
      return res.status(400).json({ error: 'Only PDF and Word files are allowed.' });
    }

    // Fallback headings if none found
    if (headings.length === 0) {
      headings = [{ level: 1, title: 'Document' }];
    }

    const docId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    DOCS.set(docId, { text, headings });

    const summary = text.slice(0, 400);

    res.json({
      docId,
      headings,
      summary
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to parse document' });
  }
});

// Chat endpoint (LLM grounded on uploaded text)
app.post('/api/chat', express.json(), async (req, res) => {
  try {
    const { docId, messages } = req.body || {};
    if (!docId || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'docId and messages are required' });
    }
    const doc = DOCS.get(docId);
    if (!doc) return res.status(404).json({ error: 'Document not found' });

    const system = `You are a helpful learning guide. Use ONLY the provided document context when teaching.
If asked for topics unrelated to the document, steer back to the document.
Document context:
${doc.text.slice(0, 120000)}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: system },
        ...messages
      ],
      temperature: 0.3
    });

    res.json({ reply: completion.choices[0].message?.content || '' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Chat failed' });
  }
});