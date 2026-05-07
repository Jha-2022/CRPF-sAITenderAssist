import React, { useState } from 'react';

function Add_new_tender() {
    const [tenderFile, setTenderFile] = useState(null);
    const [bidFiles, setBidFiles] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [bidderName, setBidderName] = useState("");

    const handleIngestion = async () => {
        if (!tenderFile || bidFiles.length === 0 || !bidderName) {
            alert("Please provide Bidder Name and all documents.");
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append('files', tenderFile); // Master Rule
        bidFiles.forEach(file => formData.append('files', file)); // Bids

        try {
            const response = await fetch(`http://localhost:8000/api/ingest?tender_id=CRPF-2024-CONST&bidder_name=${bidderName}`, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                alert("Ingestion Successful! The AI is now processing documents in the background.");
                setTenderFile(null);
                setBidFiles([]);
                setBidderName("");
            }
        } catch (error) {
            console.error("Ingestion failed:", error);
            alert("Connection error. Is the backend running?");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="content-body">
            <div className="welcome-card">
                <h1>Ingestion Phase</h1>
                <p>Upload the Master Tender Document and Applicant Evidence to begin the AI evaluation process.</p>
            </div>

            <div className="workflow-section" style={{marginBottom: '2rem'}}>
                <input 
                    type="text" 
                    placeholder="Enter Bidder Name (e.g. Construction Hub Ltd)" 
                    className="custom-input"
                    value={bidderName}
                    onChange={(e) => setBidderName(e.target.value)}
                    style={{width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white'}}
                />
            </div>

            <div className="upload-grid">
                <div className="upload-card">
                    <div className="card-header">
                        <span className="step-badge">Step 1</span>
                        <h3>Master Tender Rulebook</h3>
                    </div>
                    <p className="card-description">Upload the official tender notice. This will be used as the "Master Rule" for extraction.</p>
                    <div className="file-input-wrapper">
                        <input 
                            type="file" 
                            id="tender-upload" 
                            accept=".pdf"
                            onChange={(e) => setTenderFile(e.target.files[0])}
                            className="hidden-input"
                        />
                        <label htmlFor="tender-upload" className="custom-file-upload">
                            <span className="upload-icon">📄</span>
                            {tenderFile ? tenderFile.name : "Choose Tender PDF"}
                        </label>
                    </div>
                </div>

                <div className="upload-card">
                    <div className="card-header">
                        <span className="step-badge">Step 2</span>
                        <h3>Bidder Evidence</h3>
                    </div>
                    <p className="card-description">Upload all bidder submissions. The AI will cross-examine these against the rules.</p>
                    <div className="file-input-wrapper">
                        <input 
                            type="file" 
                            id="bids-upload" 
                            multiple 
                            accept=".pdf,.png,.jpg,.jpeg"
                            onChange={(e) => setBidFiles(Array.from(e.target.files))}
                            className="hidden-input"
                        />
                        <label htmlFor="bids-upload" className="custom-file-upload">
                            <span className="upload-icon">📁</span>
                            {bidFiles.length > 0 ? `${bidFiles.length} files selected` : "Choose Bidder Files (PDF/Images)"}
                        </label>
                    </div>
                </div>
            </div>

            <div className="action-footer">
                <button 
                    className={`primary-button ${(!tenderFile || bidFiles.length === 0 || isUploading) ? 'disabled' : ''}`}
                    disabled={!tenderFile || bidFiles.length === 0 || isUploading}
                    onClick={handleIngestion}
                >
                    {isUploading ? "Uploading..." : "Initialize AI Pipeline"}
                    <span className="button-icon">{isUploading ? "⌛" : "⚡"}</span>
                </button>
            </div>
        </div>
    )
}

export default Add_new_tender;