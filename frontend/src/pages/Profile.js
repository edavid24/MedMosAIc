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
            <img id="darkIcon" className="darkButton" 
                    src={darkMode ? sun : night} // Use imported images here
                    alt={darkMode ? 'Sun Icon' : 'Moon Icon'}
                    width="70" height="70" onClick={toggleDarkMode}/>
            <Logo text="MedMosaic" />
            <PatientMosaic patientData={patientData} />
        </div>
    );
}


export default Profile;