import React, { useState } from 'react';
import Overview from '../pages/Overview.jsx';
import Add_new_tender from '../pages/Add_new_tender.jsx';
import TenderRules from '../pages/TenderRules.jsx';
import BidderEvidence from '../pages/BidderEvidence.jsx';
import AuditReports from '../pages/AuditReports.jsx';
import Settings from '../pages/Settings.jsx';
import ActiveTenders from '../pages/ActiveTenders.jsx';
import PendingAudits from '../pages/PendingAudits.jsx';
import CompletedReports from '../pages/CompletedReports.jsx';

import Sidebar from './Sidebar.jsx';
import Navbar from './Navbar.jsx';

function Dashboard({ onBack }) {
    const [activeTab, setActiveTab] = useState('overview');

    const renderContent = () => {
        switch (activeTab) {
            case 'overview': return (
                <Overview 
                    onViewTenders={() => setActiveTab('active-tenders')}
                    onViewAudits={() => setActiveTab('pending-audits')}
                    onViewReports={() => setActiveTab('completed-reports')}
                />
            );
            case 'add-tender': return <Add_new_tender />;
            case 'rules': return <TenderRules />;
            case 'evidence': return <BidderEvidence />;
            case 'reports': return <AuditReports />;
            case 'settings': return <Settings />;
            case 'active-tenders': return <ActiveTenders />;
            case 'pending-audits': return <PendingAudits />;
            case 'completed-reports': return <CompletedReports />;
            default: return <Overview />;
        }
    };

    const getPageTitle = () => {
        switch (activeTab) {
            case 'overview': return 'Dashboard Overview';
            case 'add-tender': return 'Add New Tender';
            case 'rules': return 'Tender Rules';
            case 'evidence': return 'Bidder Evidence';
            case 'reports': return 'AI Audit Reports';
            case 'settings': return 'System Settings';
            case 'active-tenders': return 'Active Tenders';
            case 'pending-audits': return 'Pending Audits';
            case 'completed-reports': return 'Completed Reports';
            default: return 'Dashboard';
        }
    };

    return (
        <div className="dashboard-layout">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onBack={onBack} />

            <main className="main-content">
                <Navbar title={getPageTitle()} />

                <div className="dashboard-view-container">
                    {renderContent()}
                </div>
            </main>
        </div>
    )
}

export default Dashboard;