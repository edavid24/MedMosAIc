import React from 'react';
import WebRequestButton from '../components/WebRequestButton';
import PatientMosaic from '../components/PatientBoxes';
import Logo from '../components/Logo';

function Profile() {

    const patientData = {
        name: 'Patient 1',
        'DOB': 'Jan 1, 1980',
        'Blood Type': 'A+',
        'Height': '175 cm',
        'Weight': '70 kg',
        color: '#007BFF',
    };
    return (
        <div className="App">
            <Logo text="MedMosaic" />
            <PatientMosaic patientData={patientData} />
        </div>
    );
}


export default Profile;