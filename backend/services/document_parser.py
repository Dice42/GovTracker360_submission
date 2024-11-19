from fastapi import UploadFile
from typing import List
import docx2txt
import pdfplumber

# Function to extract text from a PDF file
async def extract_text_from_pdf(file: UploadFile) -> str:
    with pdfplumber.open(file.file) as pdf:
        return " ".join([page.extract_text() or "" for page in pdf.pages])

# Function to extract text from a DOCX file
async def extract_text_from_docx(file: UploadFile) -> str:
    return docx2txt.process(file.file)

# Function to handle multiple document types
async def parse_documents(files: List[UploadFile]) -> List[str]:
    texts = []
    for file in files:
        if file.filename.endswith('.pdf'):
            texts.append(await extract_text_from_pdf(file))
        elif file.filename.endswith('.docx'):
            texts.append(await extract_text_from_docx(file))
        else:
            texts.append((await file.read()).decode('utf-8', errors='ignore'))
    return texts
