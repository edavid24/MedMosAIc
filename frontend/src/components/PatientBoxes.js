import React, { useState } from 'react';
import WebRequestButton from '../components/WebRequestButton';
import Checklist from '../components/Checklist';
import './PatientMosaic.css'; // Create the corresponding CSS file

function PatientBoxes({ patientData }) {
    const [isHidden, setIsHidden] = useState(false);

    const handleButtonClick = () => {
        setIsHidden(true);
    };

    const darkMode = localStorage.getItem('darkMode') === 'true';

    return (
        <div>
            <div id="patient-name" className={`${darkMode ? 'dark-mode' : ''}`}>{patientData.name}</div>
            <div className="triplet-container"> 
                <div className={`halfTriplet ${darkMode ? 'dark-mode' : ''}`}>
                    <h2>Information</h2>
                    {Object.keys(patientData.info).map((property, index) => (
                        <p
                            key={index}
                        >
                            <span className={`importantInfo ${darkMode ? 'dark-mode' : ''}`}>{property}:</span> 
                            <span className={`otherInfo ${darkMode ? 'dark-mode' : ''}`}>{patientData.info[property]}</span>
                        </p>
                    ))}
                </div>
                
                <div className={`triplet ${isHidden ? 'hide' : ''} ${darkMode ? 'dark-mode' : ''}`} id='editor'>
                        <button onClick={handleButtonClick}>DISAPPEAR</button>
                        <WebRequestButton />
                </div>
                <div className={`triplet ${darkMode ? 'dark-mode' : ''}`}>
                    <Checklist />
                </div>

                <div className={`halfTriplet ${darkMode ? 'dark-mode' : ''}`}>
                    <h2>History</h2>
                    <li>
                        <ul>
                            LEAN
                        </ul>
                    </li>
                </div>
                
            </div>
        </div>
    );
}

export default PatientBoxes;
