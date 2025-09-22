from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import os
from .utils import extract_text_from_pdf
from .model import analyze_resume

app = FastAPI(title='AI Resume Analyzer API')

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

BASE_DIR = os.path.dirname(__file__)
UPLOAD_DIR = os.path.join(BASE_DIR, '..', 'uploads')
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.get('/health')
def health():
    return {'status': 'ok'}

@app.post('/analyze')
async def analyze(file: UploadFile = File(...), job_description: str = Form("")):
    # Save uploaded file
    contents = await file.read()
    out_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(out_path, 'wb') as f:
        f.write(contents)

    text = extract_text_from_pdf(out_path)
    result = analyze_resume(text, job_description)
    return JSONResponse({'result': result})
