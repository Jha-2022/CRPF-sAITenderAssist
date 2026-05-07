import React from 'react';

function TenderRules() {
    return (
        <div className="content-body">
            <div className="welcome-card">
                <h1>Extracted Eligibility Criteria</h1>
                <p>The AI has analyzed the Master Rulebook and identified the following mandatory requirements for this tender.</p>
            </div>
            
            <div className="workflow-grid">
                <div className="workflow-card">
                    <div className="card-header">
                        <span className="step-badge">Financial</span>
                        <h3>Annual Turnover</h3>
                    </div>
                    <p>Minimum average annual turnover required over the last 3 financial years.</p>
                    <ul className="card-list">
                        <li><strong>Threshold:</strong> ≥ ₹5.00 Crore</li>
                        <li><strong>Evidence:</strong> Audited Balance Sheets / CA Certificate</li>
                        <li><strong>Status:</strong> <span style={{color: '#a5a6f6'}}>Mandatory</span></li>
                    </ul>
                </div>

                <div className="workflow-card">
                    <div className="card-header">
                        <span className="step-badge">Technical</span>
                        <h3>Project Experience</h3>
                    </div>
                    <p>Track record of successful execution in similar construction services.</p>
                    <ul className="card-list">
                        <li><strong>Threshold:</strong> ≥ 3 Similar Projects</li>
                        <li><strong>Timeline:</strong> Last 5 Years</li>
                        <li><strong>Status:</strong> <span style={{color: '#a5a6f6'}}>Mandatory</span></li>
                    </ul>
                </div>

                <div className="workflow-card">
                    <div className="card-header">
                        <span className="step-badge highlight">Compliance</span>
                        <h3>Statutory Registrations</h3>
                    </div>
                    <p>Mandatory legal and quality certifications for government contracting.</p>
                    <ul className="card-list">
                        <li><strong>GST:</strong> Valid Registration Certificate</li>
                        <li><strong>Quality:</strong> ISO 9001 Certification</li>
                        <li><strong>Status:</strong> <span style={{color: '#a5a6f6'}}>Mandatory</span></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default TenderRules;
