import React, { useState, useEffect } from 'react';

function ActiveTenders() {
    const [tenders, setTenders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTenders = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/tenders?status=Open');
                const data = await response.json();
                setTenders(data);
            } catch (error) {
                console.error("Failed to fetch tenders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTenders();
    }, []);

    return (
        <div className="content-body">
            <div className="welcome-card">
                <h1>Active Tender Repository</h1>
                <p>Overview of all ongoing procurement processes across various CRPF departments.</p>
            </div>
            
            {loading ? (
                <div className="loading-spinner-container">
                    <div className="spinner"></div>
                    <p>Synchronizing with CRPF Secure Database...</p>
                </div>
            ) : (
                <div className="workflow-section">
                    <div className="workflow-card" style={{width: '100%'}}>
                        <table className="evaluation-table">
                            <thead>
                                <tr>
                                    <th>Tender ID</th>
                                    <th>Project Title</th>
                                    <th>Issued By</th>
                                    <th>Closing Date</th>
                                    <th>Current Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tenders.map((tender) => (
                                    <tr key={tender.id}>
                                        <td>{tender.id}</td>
                                        <td>{tender.title}</td>
                                        <td>{tender.issuedBy}</td>
                                        <td>{tender.date}</td>
                                        <td>
                                            <span className={`badge-${tender.status === 'Open' ? 'pass' : tender.status === 'Closed' ? 'fail' : 'review'}`}>
                                                {tender.status.toUpperCase()}
                                            </span>
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

export default ActiveTenders;
