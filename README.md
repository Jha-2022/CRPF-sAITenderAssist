This project, **TenderAI**, is an intelligence pipeline designed for the **Central Reserve Police Force (CRPF)** to automate the evaluation of government procurement tenders. It uses a three-stage AI process to transform unstructured documents (PDFs and images) into legally explainable audit reports.

### 📂 Folder Structure

````
    jha-2022/crpf-saitenderassist/
├── backend/                # FastAPI Python Backend
│   ├── uploads/            # Local storage for uploaded PDFs/Images
│   ├── app.py              # Main API and Mock OCR/AI Logic
│   ├── init_db.py          # Database schema and sample data initialization
│   ├── main.py             # Alternative entry point for tender stats/listing
│   └── tenders.db          # SQLite Relational Database
├── frontend/               # React + Vite Frontend
│   ├── public/             # Static assets (logos)
│   ├── src/
│   │   ├── components/     # Layout components (Navbar, Sidebar, Dashboard)
│   │   ├── pages/          # Functional views (Ingestion, Reports, Rules)
│   │   ├── App.jsx         # Main routing and navigation logic
│   │   └── App.css         # UI/UX styling
│   ├── index.html          # HTML entry point
│   └── package.json        # Frontend dependencies (React 19, Vite 8)
└── .gitignore              # Project-wide ignore rules
````
### ⚙️ System Workflow Cycle

The system processes procurement data through a **three-stage intelligence pipeline**:

1.  **Phase 1: Ingestion**
    
    *   Users upload a tender.pdf (the "Master Rule") and bidder evidence files.
        
    *   The system supports digital PDFs, scanned documents, and mobile photographs (.jpg, .png).
        
2.  **Phase 2: Digital Twin**
    
    *   Raw documents are converted into machine-readable JSON formats in a secure sandbox.
        
    *   This phase utilizes **OpenCV** for image denoising and **Tesseract OCR** for text extraction.
        
3.  **Phase 3: AI Reasoning & Audit**
    
    *   **Gemini 1.5 Flash** performs cross-examination logic to match bidder evidence against mandatory tender requirements (e.g., Annual Turnover thresholds or ISO certifications).
        
    *   **Final Output:** Generates a consolidated **Comparative Statement (CS)** with page-level evidence tracking for legal explainability.
        

### 🚀 Getting Started

#### Prerequisites

*   Python 3.8+
    
*   Node.js 18+
    
*   SQLite3
    

#### Backend Setup

1.  Navigate to the backend directory.
    
2.  Bashpython init\_db.py_(This creates tenders.db with relational department and sample tender data)_.
    
3.  Bashpython app.py_The API will run on http://localhost:8000_.
    

#### Frontend Setup

1.  Navigate to the frontend directory.
    
2.  Bashnpm install
    
3.  Bashnpm run dev
    
4.  Open your browser to the URL provided by Vite (usually http://localhost:5173).
    

### 🛠️ Core Technologies

*   **Backend:** FastAPI (Python), SQLite, Pydantic, UUID.
    
*   **Frontend:** React 19, Vite, Lucide-style icons, CSS3 animations.
    
*   **AI/ML (Logical Integration):** Gemini 1.5 Flash (Targeted), Tesseract OCR, OpenCV.
