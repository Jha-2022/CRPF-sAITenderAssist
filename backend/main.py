from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import sqlite3

app = FastAPI()

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_FILE = "tenders.db"

class Tender(BaseModel):
    id: str
    title: str
    issuedBy: str
    date: str
    status: str

@app.get("/api/tenders", response_model=List[Tender])
async def get_tenders(status: Optional[str] = Query(None)):
    """
    Fetches tenders from the relational database.
    Supports filtering by status (e.g., ?status=Open or ?status=Evaluation,Draft)
    """
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    # Base query using a JOIN to get the department name
    query = '''
        SELECT t.id, t.title, d.name as issuedBy, t.date, t.status
        FROM tenders t
        JOIN departments d ON t.dept_id = d.id
    '''
    
    # Apply relational filtering if status is provided
    if status:
        status_list = status.split(',')
        placeholders = ','.join(['?'] * len(status_list))
        query += f' WHERE t.status IN ({placeholders})'
        cursor.execute(query, status_list)
    else:
        cursor.execute(query)
        
    rows = cursor.fetchall()
    tenders = [dict(row) for row in rows]
    conn.close()
    
    return tenders

@app.get("/api/stats")
async def get_stats():
    """
    Returns counts for the Overview dashboard cards.
    """
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    
    # Count Active (Open)
    cursor.execute("SELECT COUNT(*) FROM tenders WHERE status = 'Open'")
    active = cursor.fetchone()[0]
    
    # Count Pending (Evaluation or Draft)
    cursor.execute("SELECT COUNT(*) FROM tenders WHERE status IN ('Evaluation', 'Draft')")
    pending = cursor.fetchone()[0]
    
    # Count Completed (Closed)
    cursor.execute("SELECT COUNT(*) FROM tenders WHERE status = 'Closed'")
    completed = cursor.fetchone()[0]
    
    conn.close()
    return {
        "active": active,
        "pending": pending,
        "completed": completed
    }

if __name__ == "__main__":
    import uvicorn
    # Start the server on port 8000
    uvicorn.run(app, host="0.0.0.0", port=8000)
