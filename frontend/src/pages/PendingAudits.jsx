import React, { useState, useEffect } from 'react';

function PendingAudits() {
    const [audits, setAudits] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAudits = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/tenders?status=Evaluation,Draft');
                const data = await response.json();
                setAudits(data);
            } catch (error) {
                console.error("Failed to fetch audits:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAudits();
    }, []);

    return (
        <div className="content-body">
            <div className="welcome-card">
                <h1>Pending AI Audits</h1>
                <p>These tenders are currently undergoing AI document verification and rule-matching.</p>
            </div>
            
            {loading ? (
                <div className="loading-spinner-container">
                    <div className="spinner"></div>
                    <p>Fetching active audit streams...</p>
                </div>
            ) : (
                <div className="workflow-section">
                    <div className="workflow-card" style={{width: '100%'}}>
                        <table className="evaluation-table">
                            <thead>
                                <tr>
                                    <th>Audit ID</th>
                                    <th>Tender Title</th>
                                    <th>Dept</th>
                                    <th>Progress</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {audits.map((audit) => (
                                    <tr key={audit.id}>
                                        <td>AUD-{audit.id.split('/').pop()}</td>
                                        <td>{audit.title}</td>
                                        <td>{audit.issuedBy}</td>
                                        <td>
                                            <div className="progress-bar-container">
                                                <div className="progress-bar" style={{width: '65%'}}></div>
                                            </div>
                                        </td>
                                        <td>
                                            <button className="badge-review" style={{border: 'none', cursor: 'pointer'}}>Review Live</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PendingAudits;
