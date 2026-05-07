import React, { useState, useEffect } from 'react';

function AuditReports() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/reports');
                const data = await response.json();
                setReports(data);
            } catch (error) {
                console.error("Failed to fetch reports:", error);
            } finally {
                setLoading(false);
            }
        };

        // Poll for updates every 3 seconds to show OCR progress
        const interval = setInterval(fetchReports, 3000);
        fetchReports();
        
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="content-body">
            <div className="welcome-card">
                <h1>AI Evaluation Summary</h1>
                <p>Consolidated results for bidder submissions. The AI updates these reports as OCR processing completes.</p>
            </div>
            
            <div className="workflow-section">
                <h3 className="section-title" style={{textAlign: 'left', marginBottom: '2rem'}}>Comparative Statement (CS)</h3>
                <div className="workflow-card" style={{width: '100%'}}>
                    <table className="evaluation-table">
                        <thead>
                            <tr>
                                <th>Bidder Name</th>
                                <th>Financial Score</th>
                                <th>Technical Score</th>
                                <th>Compliance</th>
                                <th>Final Verdict</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map((report) => (
                                <tr key={report.id}>
                                    <td>{report.bidder_name}</td>
                                    <td className={report.status === 'PROCESSING' ? '' : report.status === 'ELIGIBLE' ? 'status-pass' : 'status-review'}>
                                        {report.financial_score}
                                    </td>
                                    <td className={report.status === 'PROCESSING' ? '' : report.status === 'ELIGIBLE' ? 'status-pass' : 'status-review'}>
                                        {report.technical_score}
                                    </td>
                                    <td className={report.status === 'PROCESSING' ? '' : report.status === 'ELIGIBLE' ? 'status-pass' : 'status-review'}>
                                        {report.compliance_status}
                                    </td>
                                    <td>
                                        <span className={
                                            report.status === 'ELIGIBLE' ? 'badge-pass' : 
                                            report.status === 'PROCESSING' ? 'badge-review' : 'badge-review'
                                        }>
                                            {report.status}
                                        </span>
                                    </td>
                                    <td style={{fontSize: '0.8rem', opacity: 0.6}}>{report.timestamp.split(' ')[1]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {reports.length === 0 && !loading && (
                        <div style={{padding: '3rem', textAlign: 'center', opacity: 0.5}}>
                            No audit reports found. Start by adding a new tender.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AuditReports;
