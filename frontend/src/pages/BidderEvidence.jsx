import React from 'react';

function BidderEvidence() {
    return (
        <div className="content-body">
            <div className="welcome-card">
                <h1>Bidder Evidence Sandbox</h1>
                <p>Monitor the extraction of applicant data from uploaded PDFs and images.</p>
            </div>
            
            <div className="stats-grid">
                <div className="stat-card">
                    <span>Processed Bidders</span>
                    <h3>24</h3>
                </div>
                <div className="stat-card">
                    <span>OCR Accuracy</span>
                    <h3>98.2%</h3>
                </div>
            </div>
        </div>
    );
}

export default BidderEvidence;
