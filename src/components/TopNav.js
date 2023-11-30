// TopNavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';  

const TopNavBar = ({  handleLogout }) => {
    return (
        <nav className="top-navbar">
            <div className="menu-dropdown">
                <p className="menu-icon">☰<b>Menu</b></p>
                <div className="side-menu">
                    <ul>
  
                    <li><Link to="/home" style={{ textDecoration: 'none' ,color: 'black'}}>Home Page</Link></li>
                    <li><Link to="/TrackHealth" style={{ textDecoration: 'none' ,color: 'black'}}>Track Your Health</Link></li>
                    <li><Link to="/HeartHealthData" style={{ textDecoration: 'none' ,color: 'black'}}>Previous risk levels</Link></li>
                        <li><Link to="/Profile" style={{ textDecoration: 'none' ,color: 'black'}}>Profile Page</Link></li>
                        <li ><Link to="/bmi" style={{ textDecoration: 'none' ,color: 'black'}}>Calculate BMI</Link></li>
                        <li ><Link to="/" style={{ textDecoration: 'none' ,color: 'black'}}>Logout</Link></li>
                    </ul>
                </div>
            </div>

            <div className="nav-title">
                <span className="stethoscope-icon">🩺</span>
                Healthcare Analytics
            </div>
            <div style={{ width: 'fit-content' }}></div>
        </nav>
    );
};

export default TopNavBar;
