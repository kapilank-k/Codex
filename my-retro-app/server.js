import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
// You can change the port if 3001 is already in use on your system.
const PORT = 3001;

// This allows your React app (running on a different port) to make requests to this server.
app.use(cors());

// This is the new endpoint your React app will call.
app.get('/api/pixel-art', async (req, res) => {
    const { prompt } = req.query;

    if (!prompt) {
        return res.status(400).send({ error: 'A "prompt" query parameter is required.' });
    }

    try {
        // The server calls the image generation API on behalf of your React app.
        const externalApiUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;
        console.log(`Forwarding request to: ${externalApiUrl}`);

        // We fetch the image as a stream for efficiency.
        const response = await axios({
            method: 'get',
            url: externalApiUrl,
            responseType: 'stream'
        });

        // We send the image's content type (e.g., 'image/png') back to the browser.
        res.setHeader('Content-Type', response.headers['content-type']);

        // And finally, we stream the image data directly back to your React app.
        response.data.pipe(res);

    } catch (error) {
        console.error('Error fetching from external API:', error.message);
        res.status(500).send({ error: 'Failed to fetch the image.' });
    }
});

app.listen(PORT, () => {
    console.log(`Image proxy server is running on http://localhost:${PORT}`);
});

