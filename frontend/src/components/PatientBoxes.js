import React from 'react';
import WebRequestButton from '../components/WebRequestButton';
import './PatientMosaic.css'; // Create the corresponding CSS file

function PatientBoxes({ patientData }) {
    return (
        <div>
            <div id="patient-name">{patientData.name}</div>
            <div className="triplet-container"> 
                <div className="triplet patient-mosaic">
                    {Object.keys(patientData.info).map((property, index) => (
                        <div
                            key={index}
                        >
                            {property}: {patientData.info[property]}
                        </div>
                    ))}
                </div>
                <div className='triplet'>
                    <h2>Medical History</h2>
                    <p>jfaoiewjfa;fwj</p>
                </div>
                <div className='triplet'>
                    <WebRequestButton />
                </div>

            </div>
        </div>
    );
}

export default PatientBoxes;
