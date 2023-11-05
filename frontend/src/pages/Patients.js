import React, { useState, useEffect } from 'react';
import PatientCard from '../components/PatientCard';
import Logo from '../components/Logo';
import '../App.css';
import night from '../components/nightIcon.png';
import sun from '../components/sunIcon.png';

function Patients() {
    const [darkMode, setDarkMode] = useState(false);

    const [patients, setPatients] = useState([]);

    useEffect(() => {
        const initialDarkMode = localStorage.getItem('darkMode') === 'true';
        setDarkMode(initialDarkMode);
        document.body.classList.toggle('dark-mode', initialDarkMode);


        makeRequest();

    }, []);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark-mode', !darkMode);
        localStorage.setItem('darkMode', !darkMode);
    };

    const makeRequest = () => {
        fetch("http://medmosaic.pythonanywhere.com/patients")
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                setPatients(json.documents);
            })
    }
     
    return (
        
        <div className="App">
            <img id="darkIcon" className="darkButton" 
                    src={darkMode ? sun : night} // Use imported images here
                    alt={darkMode ? 'Sun Icon' : 'Moon Icon'}
                    width="50" height="50" onClick={toggleDarkMode}/>
            <Logo text="MedMosaic" />
            <div style={{ "margin": "5%", "margin-top": "2%"}}>
                {patients.map((item, index) => (
                <PatientCard
                    key={item.index}
                    name={`${item.patient.first_name} ${item.patient.last_name}`}
                    id={item.patient_id}
                    number="3B"
                    details="He's joe mama gotem"
                />
                ))}
            </div>
        </div>
    );
}
export default Patients;