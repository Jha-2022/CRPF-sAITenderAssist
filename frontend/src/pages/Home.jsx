import REACT from 'react';
function Home({ onNavigate }) {
    return (
        <div className="home-page">
            <header className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">CRPF AI Tender System</h1>
                    <p className="hero-description">
                        Transforming raw procurement data into legally explainable insights through a 
                        three-stage intelligence pipeline.
                    </p>
                    <button className="primary-button" onClick={onNavigate}>
                        Launch Dashboard
                        <span className="button-icon">→</span>
                    </button>
                </div>
                <div className="hero-image-container">
                    <img className="hero-logo" src={"./crpflogo.jfif"} alt="CRPF Logo" />
                </div>
            </header>

            <section className="workflow-section">
                <h2 className="section-title">System Workflow Cycle</h2>
                <div className="workflow-grid">
                    <div className="workflow-card">
                        <div className="card-header">
                            <span className="step-badge">Phase 1</span>
                            <h3>Ingestion</h3>
                        </div>
                        <p>Place your <code>tender.pdf</code> and bidder files into the designated folders. The system automatically identifies the "Master Rule" and "Applicant Evidence".</p>
                        <ul className="card-list">
                            <li>Digital PDFs & Scanned Docs</li>
                            <li>Mobile Photos (.jpg, .png)</li>
                        </ul>
                    </div>

                    <div className="workflow-card">
                        <div className="card-header">
                            <span className="step-badge">Phase 2</span>
                            <h3>Digital Twin</h3>
                        </div>
                        <p>Documents are converted into machine-readable JSON formats in a "Clean Room" sandbox.</p>
                        <ul className="card-list">
                            <li>Direct Data Scraping</li>
                            <li>OpenCV Image Denoising</li>
                            <li>Tesseract OCR Extraction</li>
                        </ul>
                    </div>

                    <div className="workflow-card">
                        <div className="card-header">
                            <span className="step-badge">Phase 3</span>
                            <h3>AI Reasoning</h3>
                        </div>
                        <p>Gemini 1.5 Flash performs Cross-Examination logic to match bidder evidence against tender requirements.</p>
                        <ul className="card-list">
                            <li>Conflict Resolution</li>
                            <li>Eligibility Determination</li>
                            <li>Manual Review Flags</li>
                        </ul>
                    </div>

                    <div className="workflow-card">
                        <div className="card-header">
                            <span className="step-badge highlight">Final</span>
                            <h3>Audit Trail</h3>
                        </div>
                        <p>Generation of a consolidated report with full explainability for every procurement decision.</p>
                        <ul className="card-list">
                            <li>Page-level Evidence Tracking</li>
                            <li>Legally Explainable Reports</li>
                            <li>Comparative Statement Export</li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Home;