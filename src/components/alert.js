// Alert.js
import React from 'react';
import '../styles/alert.css';

const Alert = ({ message, onClose }) => {
    return (
        <div className="alert-popup">
            <div className="alert-content">
                <p>{message}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Alert;
