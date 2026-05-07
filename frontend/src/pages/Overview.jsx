import React, { useState, useEffect } from 'react';

function Overview({ onViewTenders, onViewAudits, onViewReports }){
    const [stats, setStats] = useState({ active: 0, pending: 0, completed: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/stats');
                const data = await response.json();
                setStats(data);
            } catch (error) {
                console.error("Failed to fetch dashboard stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return(
        <div className="content-body">
            <div className="welcome-card">
                <h1>Welcome back, Officer!</h1>
                <p>The AI pipeline is ready to process your latest tender documents.</p>
            </div>
            
            <div className="stats-grid">
                <div className="stat-card clickable" onClick={onViewTenders}>
                    <span>Active Tenders</span>
                    <h3>{loading ? '...' : stats.active}</h3>
                </div>
                <div className="stat-card clickable" onClick={onViewAudits}>
                    <span>Pending Audits</span>
                    <h3>{loading ? '...' : stats.pending}</h3>
                </div>
                <div className="stat-card clickable" onClick={onViewReports}>
                    <span>Completed Reports</span>
                    <h3>{loading ? '...' : stats.completed}</h3>
                </div>
            </div>
        </div>
    )
}

export default Overview;