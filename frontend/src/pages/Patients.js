import React, { useState, useEffect } from 'react';
import PatientCard from '../components/PatientCard';
import Logo from '../components/Logo';
import '../App.css';


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
            <button onClick={toggleDarkMode}>
                {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
        </div>
    );
}
export default Patients;