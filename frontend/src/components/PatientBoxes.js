import React from 'react';
import './PatientMosaic.css'; // Create the corresponding CSS file

function PatientBoxes({ patientData }) {
    return (
        <div className="patient-mosaic">
            {Object.keys(patientData).map((property, index) => (
                <div
                    key={index}
                    className="patient-box"
                    style={{
                        backgroundColor: patientData.color,
                    }}
                >
                    <div className="property-name">{property}</div>
                    <div className="property-value">{patientData[property]}</div>
                </div>
            ))}
        </div>
    );
}

export default PatientBoxes;
