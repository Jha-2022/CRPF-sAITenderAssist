from fastapi import FastAPI, UploadFile, File, BackgroundTasks, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import sqlite3
import os
import time
import uuid

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_FILE = "tenders.db"
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Database initialization
def init_db():
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    
    # Audit Reports Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS audit_reports (
            id TEXT PRIMARY KEY,
            tender_id TEXT,
            bidder_name TEXT,
            status TEXT,
            financial_score TEXT,
            technical_score TEXT,
            compliance_status TEXT,
            summary TEXT,
            timestamp TEXT
        )
    ''')
    conn.commit()
    conn.close()

init_db()

# Models
class AuditReport(BaseModel):
    id: str
    tender_id: str
    bidder_name: str
    status: str
    financial_score: str
    technical_score: str
    compliance_status: str
    summary: str
    timestamp: str

# Mock OCR and Analysis Engine
def process_ocr_and_evaluate(report_id: str, bidder_name: str, tender_id: str):
    """
    Simulates the OCR extraction and AI evaluation pipeline.
    In a real system, this would use pytesseract or EasyOCR.
    """
    print(f"Starting OCR for {bidder_name}...")
    time.sleep(5) # Simulate processing time
    
    # Mock evaluation logic
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    
    # Sample logic: Bidders with 'Ltd' in their name pass, others are flagged
    is_eligible = "Ltd" in bidder_name or "Corp" in bidder_name
    status = "ELIGIBLE" if is_eligible else "MANUAL REVIEW"
    
    cursor.execute('''
        UPDATE audit_reports 
        SET status = ?, 
            financial_score = ?, 
            technical_score = ?, 
            compliance_status = ?,
            summary = ?
        WHERE id = ?
    ''', (
        status, 
        "₹6.2 Cr (Verified)" if is_eligible else "Unclear", 
        "4 Projects Found" if is_eligible else "Incomplete Documentation",
        "GST/ISO Verified" if is_eligible else "Pending Verification",
        f"AI successfully mapped evidence for {bidder_name}." if is_eligible else "Handwriting detected. Requires human verification.",
        report_id
    ))
    
    conn.commit()
    conn.close()
    print(f"Audit completed for {bidder_name}")

@app.post("/api/ingest")
async def ingest_tender(
    background_tasks: BackgroundTasks,
    tender_id: str = Query(...),
    bidder_name: str = Query(...),
    files: List[UploadFile] = File(...)
):
    report_id = str(uuid.uuid4())[:8]
    timestamp = time.strftime("%Y-%m-%d %H:%M:%S")
    
    # 1. Save files locally (Mocking storage)
    for file in files:
        file_path = os.path.join(UPLOAD_DIR, f"{report_id}_{file.filename}")
        with open(file_path, "wb") as buffer:
            buffer.write(await file.read())
            
    # 2. Create initial "Processing" report
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO audit_reports (id, tender_id, bidder_name, status, financial_score, technical_score, compliance_status, summary, timestamp)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (report_id, tender_id, bidder_name, "PROCESSING", "Pending", "Pending", "Pending", "Running AI OCR Pipeline...", timestamp))
    conn.commit()
    conn.close()
    
    # 3. Trigger OCR in background
    background_tasks.add_task(process_ocr_and_evaluate, report_id, bidder_name, tender_id)
    
    return {"message": "Ingestion started", "report_id": report_id}

@app.get("/api/reports", response_model=List[AuditReport])
async def get_reports():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM audit_reports ORDER BY timestamp DESC")
    rows = cursor.fetchall()
    reports = [dict(row) for row in rows]
    conn.close()
    return reports

# Re-including the Tenders logic from main.py for full functionality
class Tender(BaseModel):
    id: str
    title: str
    issuedBy: str
    date: str
    status: str

@app.get("/api/tenders", response_model=List[Tender])
async def get_tenders(status: Optional[str] = None):
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    query = 'SELECT t.id, t.title, d.name as issuedBy, t.date, t.status FROM tenders t JOIN departments d ON t.dept_id = d.id'
    if status:
        status_list = status.split(',')
        placeholders = ','.join(['?'] * len(status_list))
        query += f' WHERE t.status IN ({placeholders})'
        cursor.execute(query, status_list)
    else:
        cursor.execute(query)
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
