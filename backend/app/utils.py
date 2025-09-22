from pdfminer.high_level import extract_text

def extract_text_from_pdf(path: str) -> str:
    """Extract plain text from PDF using pdfminer."""
    try:
        text = extract_text(path)
    except Exception as e:
        print('pdf extraction error', e)
        text = ''
    return text
