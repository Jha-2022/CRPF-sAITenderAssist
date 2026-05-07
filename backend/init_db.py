import sqlite3
import os

DB_FILE = "tenders.db"

def init_db():
    # Remove existing DB if it exists to ensure new relational schema is applied
    if os.path.exists(DB_FILE):
        os.remove(DB_FILE)
        print("Deleted existing tenders.db")

    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    
    # Create Departments table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS departments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE
        )
    ''')
    
    # Create Tenders table with Foreign Key
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS tenders (
            id TEXT PRIMARY KEY,
            title TEXT,
            dept_id INTEGER,
            date TEXT,
            status TEXT,
            FOREIGN KEY (dept_id) REFERENCES departments(id)
        )
    ''')
    
    departments = [
        ("Directorate General",), ("Provisions Dept",), ("IT Wing",), 
        ("Medical Branch",), ("Transport Hub",), ("Logistics",), 
        ("Works Branch",), ("Signal Wing",), ("Clothing Dept",), 
        ("Estate Branch",), ("Admin Branch",)
    ]
    cursor.executemany("INSERT OR IGNORE INTO departments (name) VALUES (?)", departments)
    
    # Get dept IDs
    cursor.execute("SELECT id, name FROM departments")
    dept_map = {name: id for id, name in cursor.fetchall()}
    
    sample_tenders = [
        ("CRPF/2024/001", "Construction of Modular Barracks", dept_map["Directorate General"], "2024-05-10", "Open"),
        ("CRPF/2024/002", "Supply of Tactical Gear", dept_map["Provisions Dept"], "2024-05-12", "Open"),
        ("CRPF/2024/003", "IT Infrastructure Upgrade", dept_map["IT Wing"], "2024-05-15", "Evaluation"),
        ("CRPF/2024/004", "Medical Equipment Procurement", dept_map["Medical Branch"], "2024-05-18", "Open"),
        ("CRPF/2024/005", "Vehicle Maintenance Services", dept_map["Transport Hub"], "2024-05-20", "Draft"),
        ("CRPF/2024/006", "Ration Supply - North Zone", dept_map["Logistics"], "2024-05-22", "Open"),
        ("CRPF/2024/007", "Installation of Solar Panels", dept_map["Works Branch"], "2024-05-25", "Open"),
        ("CRPF/2024/008", "Communication Radio Repair", dept_map["Signal Wing"], "2024-05-28", "Closed"),
        ("CRPF/2024/009", "Uniform Stitching Contract", dept_map["Clothing Dept"], "2024-06-01", "Open"),
        ("CRPF/2024/010", "Civil Works - Training Centre", dept_map["Directorate General"], "2024-06-05", "Open"),
        ("CRPF/2024/011", "Supply of Perimeter Fencing", dept_map["Estate Branch"], "2024-06-10", "Evaluation"),
        ("CRPF/2024/012", "Printing of Annual Reports", dept_map["Admin Branch"], "2024-06-12", "Open"),
    ]
    cursor.executemany("INSERT INTO tenders VALUES (?, ?, ?, ?, ?)", sample_tenders)
    
    conn.commit()
    conn.close()
    print("Relational Database 'tenders.db' initialized successfully.")

if __name__ == "__main__":
    init_db()
