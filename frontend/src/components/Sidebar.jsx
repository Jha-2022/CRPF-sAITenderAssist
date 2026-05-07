import React from 'react';

function Sidebar({ activeTab, setActiveTab, onBack }) {
    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <img src={"./crpflogo.jfif"} alt="Logo" />
                <span>TenderAI</span>
            </div>
            <nav className="sidebar-nav">
                <button 
                    className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
                    onClick={() => setActiveTab('overview')}
                >
                    Overview
                </button>
                <button 
                    className={`nav-item ${activeTab === 'add-tender' ? 'active' : ''}`}
                    onClick={() => setActiveTab('add-tender')}
                >
                    Add new Tender
                </button>
                <button 
                    className={`nav-item ${activeTab === 'rules' ? 'active' : ''}`}
                    onClick={() => setActiveTab('rules')}
                >
                    Tender Rules
                </button>
                <button 
                    className={`nav-item ${activeTab === 'evidence' ? 'active' : ''}`}
                    onClick={() => setActiveTab('evidence')}
                >
                    Bidder Evidence
                </button>
                <button 
                    className={`nav-item ${activeTab === 'reports' ? 'active' : ''}`}
                    onClick={() => setActiveTab('reports')}
                >
                    AI Audit Reports
                </button>
                <button 
                    className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
                    onClick={() => setActiveTab('settings')}
                >
                    Settings
                </button>
            </nav>
            <div className="sidebar-footer">
                <button className="logout-button" onClick={onBack}>Exit to Home</button>
            </div>
        </aside>
    );
}

export default Sidebar;
