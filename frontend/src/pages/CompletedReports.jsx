import React, { useState, useEffect } from 'react';

function CompletedReports() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/tenders?status=Closed');
                const data = await response.json();
                setReports(data);
            } catch (error) {
                console.error("Failed to fetch reports:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, []);

    return (
        <div className="content-body">
            <div className="welcome-card">
                <h1>Completed Evaluation Reports</h1>
                <p>Access and download finalized AI-generated Comparative Statements and Audit Logs.</p>
            </div>
            
            {loading ? (
                <div className="loading-spinner-container">
                    <div className="spinner"></div>
                    <p>Loading report archive...</p>
                </div>
            ) : (
                <div className="workflow-section">
                    <div className="workflow-card" style={{width: '100%'}}>
                        <table className="evaluation-table">
                            <thead>
                                <tr>
                                    <th>Report ID</th>
                                    <th>Tender Title</th>
                                    <th>Completion Date</th>
                                    <th>Verdict</th>
                                    <th>Download</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reports.map((report) => (
                                    <tr key={report.id}>
                                        <td>REP-{report.id.split('/').pop()}</td>
                                        <td>{report.title}</td>
                                        <td>{report.date}</td>
                                        <td><span className="badge-pass">FINALIZED</span></td>
                                        <td>
                                            <button className="badge-pass" style={{border: 'none', cursor: 'pointer', background: 'rgba(165, 166, 246, 0.1)', color: '#a5a6f6'}}>
                                                PDF 📥
                                            </button>
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

export default CompletedReports;
