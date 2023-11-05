import React, { useState } from 'react';
import WebRequestButton from '../components/WebRequestButton';
import Checklist from '../components/Checklist';
import './PatientMosaic.css'; // Create the corresponding CSS file

function PatientBoxes({ patientData }) {
    const [isHidden, setIsHidden] = useState(false);

    const handleButtonClick = () => {
        setIsHidden(true);
    };
    return (
        <div>
            <div id="patient-name">{patientData.name}</div>
            <div className="triplet-container"> 
                <div className="triplet patient-mosaic">
                    <h2>Patient Information</h2>
                    {Object.keys(patientData.info).map((property, index) => (
                        <p
                            key={index}
                        >
                            <span style={{"font-weight" : "bold"}}>{property}:</span> {patientData.info[property]}
                        </p>
                    ))}
                    <h2>Medical History</h2>
                    <li>
                        <ul>
                            LEAN
                        </ul>
                    </li>
                </div>
                <div className='triplet'>
                    <Checklist />
                </div>
                <div className={`triplet ${isHidden ? 'hide' : ''}`} id='editor'>
                    <button onClick={handleButtonClick}>DISAPPEAR</button>
                    <WebRequestButton />
                </div>
            </div>
        </div>
    );
}

export default PatientBoxes;
