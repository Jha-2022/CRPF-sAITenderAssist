import React from 'react';

function Settings() {
    return (
        <div className="content-body">
            <div className="welcome-card">
                <h1>System Settings</h1>
                <p>Configure AI model parameters, OCR engines, and user access controls.</p>
            </div>
            
            <div className="workflow-grid">
                <div className="workflow-card">
                    <h3>AI Configuration</h3>
                    <p>Primary Model: Gemini 1.5 Flash</p>
                    <p>OCR Engine: Tesseract v5.0</p>
                </div>
            </div>
        </div>
    );
}

export default Settings;
