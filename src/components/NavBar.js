
import React from 'react';
import '../styles/navbar.css';  
const NavBar = ({ onHeartHealthClick, onLogout }) => {
    return (
        <nav className="top-navbar">
            <div className="nav-title-container">
                <span className="stethoscope-icon">🩺</span>
                Healthcare Analytics
            </div>
        </nav>
    );
}

export default NavBar;
