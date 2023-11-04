import React from 'react';
import PatientCard from '../components/PatientCard';
import Logo from '../components/Logo';

function Patients() {
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
        </div>
    );
}
export default Patients;