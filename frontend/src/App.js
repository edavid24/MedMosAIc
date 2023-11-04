import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
} from "react-router-dom";

import Patients from './pages/Patients';
import Profile from './pages/Profile';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Patients />} />
                <Route path="Profile/:id" element={<Profile/>} />
            </Routes>
        </BrowserRouter>
    );
}
export default App;
/*
import React from 'react';
import PatientCard from './components/PatientCard';
import WebRequestButton from './components/WebRequestButton';
import Logo from './components/Logo';

function App() {
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
*/