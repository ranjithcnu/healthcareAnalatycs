import React from 'react';
import { useNavigate } from 'react-router-dom';  
import '../styles/HomePage.css';

import { Link } from 'react-router-dom';





const Dochome = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/', { replace: true });
    };

    return (
        <div className="home-page-container">
            

            <nav className="top-navbar">
                <div className="menu-dropdown">
                    <p className="menu-icon">☰<b>Menu</b></p>
                    

                    <div className="side-menu">
                        <ul>
                            <li ><Link to="/DProfile" style={{ textDecoration: 'none' ,color: 'black'}}>Profile Page</Link></li>

                            <li ><Link to="/patientData" style={{ textDecoration: 'none' ,color: 'black'}}>Fetch Patients Data</Link></li>
                            <li onClick={handleLogout}>Logout</li>
                        </ul>
                    </div>
                </div>

                <div className="nav-title">
                    <span className="stethoscope-icon">🩺</span>
                    Healthcare Analytics
                </div>



                
                <div style={{ width: 'fit-content' }}></div>
            </nav>
            

            <div className="info-container">
                <h1>Heart Care Information</h1>
                <p>Heart diseases are among the leading causes of death globally. Regular check-ups, a balanced diet, and an active lifestyle are essential for heart health.</p>
                <h2>Common Misconceptions</h2>
                <ul>
                    <li>Young people don't have to worry about heart disease.</li>
                    <li>If you have heart disease, you should avoid exercise.</li>
                    <li>Diet doesn't affect heart health.</li>
                    <li>Only the elderly are at risk of heart disease.</li>
                </ul>
            </div>


  



        </div>
      
    );
};

export default Dochome;
