import React, { useState, useEffect } from 'react';
import PatientMosaic from '../components/PatientBoxes';
import Logo from '../components/Logo';
import night from '../components/nightIcon.png';
import sun from '../components/sunIcon.png';

function Profile() {
    const [darkMode, setDarkMode] = useState(false);
    useEffect(() => {
        const initialDarkMode = localStorage.getItem('darkMode') === 'true';
        setDarkMode(initialDarkMode);
        document.body.classList.toggle('dark-mode', initialDarkMode);
    }, []);
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark-mode', !darkMode);
        localStorage.setItem('darkMode', !darkMode);
    };

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
                    width="50" height="50" onClick={toggleDarkMode}/>
            <Logo text="MedMosaic" />
            <PatientMosaic patientData={patientData} />
        </div>
    );
}


export default Profile;