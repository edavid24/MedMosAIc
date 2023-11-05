import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PatientMosaic from '../components/PatientBoxes';
import Logo from '../components/Logo';
import night from '../components/nightIcon.png';
import sun from '../components/sunIcon.png';

function Profile() {
    const [darkMode, setDarkMode] = useState(false);
    const [patient, setPatient] = useState({patient: "", vitals: [{results: ""}], demographics: {gender: {name: "" }}, medications : [], allergies: []});
    let { id } = useParams();
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
        fetch(`http://medmosaic.pythonanywhere.com/patients/${id}`)
            .then((response) => response.json())
            .then((json) => {
                setPatient(json.document);
            })
    }
    
    return (
        <div className="App">
            <img id="darkIcon" className="darkButton" 
                    src={darkMode ? sun : night} // Use imported images here
                    alt={darkMode ? 'Sun Icon' : 'Moon Icon'}
                    width="50" height="50" onClick={toggleDarkMode}/>
            <Logo text="MedMosaic" />
            <PatientMosaic patientData={patient} />
        </div>
    );
}


export default Profile;