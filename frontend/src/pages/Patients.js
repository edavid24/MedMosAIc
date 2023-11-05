import React, { useState, useEffect } from 'react';
import PatientCard from '../components/PatientCard';
import Logo from '../components/Logo';
import '../App.css';
import night from '../components/nightIcon.png';
import sun from '../components/sunIcon.png';

function Patients() {
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

    return (
        
        <div className="App">
            <img id="darkIcon" className="darkButton" 
                    src={darkMode ? sun : night} // Use imported images here
                    alt={darkMode ? 'Sun Icon' : 'Moon Icon'}
                    width="70" height="70" onClick={toggleDarkMode}/>
            <Logo text="MedMosaic" />
            <div style={{ "margin": "5%", "margin-top": "2%"}}>
                <PatientCard
                    name="Joe Mama"
                    number="3B"
                    details="He's joe mama gotem"
                /><PatientCard
                    name="Adam"
                    number="50A"
                    details="The real OG"
                />
            </div>
        </div>
    );
}
export default Patients;