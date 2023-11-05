import React from 'react';
import PatientMosaic from '../components/PatientBoxes';
import Logo from '../components/Logo';

function Profile() {

    const patientData = {
        name: 'Joe Mama',
        'info': {
            'DOB': 'Jan 1, 1980',
            'Blood Type': 'A+',
            'Height': '175 cm',
            'Weight': '70 kg',
        }
    };
    return (
        <div className="App">
            <Logo text="MedMosaic" />
            <PatientMosaic patientData={patientData} />
        </div>
    );
}


export default Profile;