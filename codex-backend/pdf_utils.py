# pdf_utils.py
import fitz  # This is the import for PyMuPDF

def extract_text_from_pdf(file_path: str) -> str:
    """Opens a PDF and returns all its text content as a single string."""
    doc = fitz.open(file_path)
    full_text = "".join(page.get_text() for page in doc)
    doc.close()
    return full_text