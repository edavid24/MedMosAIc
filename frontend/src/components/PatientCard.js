import React from 'react';
import { Link } from "react-router-dom";
import './PatientCard.css'; // Create the corresponding CSS file

function PatientCard({ number, name, id, details }) {
    // Read the dark mode preference from local storage
    const darkMode = localStorage.getItem('darkMode') === 'true';

    return (
        <Link to={`/profile/${id}`}>
            <div className={`patient-card ${darkMode ? 'dark-mode' : ''}`}>
                <div className={`patient-name ${darkMode ? 'dark-mode' : ''}`}>{name}</div>
                <div className="patient-number">{number}</div>
                <div className="patient-details">{details}</div>
            </div>
        </Link>
    );
}

export default PatientCard;