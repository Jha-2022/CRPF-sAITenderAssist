import React from 'react';

function Navbar({ title }) {
    return (
        <header className="topbar">
            <div className="topbar-left">
                <h2 className="page-title">{title}</h2>
            </div>
            <div className="topbar-right">
                <div className="user-profile">
                    <span className="user-name">Officer Admin</span>
                    <div className="user-avatar">OA</div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
