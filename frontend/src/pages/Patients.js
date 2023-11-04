import React from 'react';
import PatientCard from '../components/PatientCard';
import Logo from '../components/Logo';

function Patients() {
    return (
        <div className="App">
            <Logo text="MedMosaic" />
            <PatientCard
                name="John Doe"
                number="3B"
                details="asfdafjeaoifejafj"
            /><PatientCard
                name="John Doe"
                number="3B"
                details="asfdafjeaoifejafj"
            />
        </div>
    );
}
export default Patients;