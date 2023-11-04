import React from 'react';
<<<<<<< HEAD
import WebRequestButton from './WebRequestButton';
import NavBar from './navBar';

function App() {
  return (
    <div className="App">
      <NavBar />
      <h1>Web Request Button</h1>
      <WebRequestButton />
    </div>
  );
=======
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
                <Route path="/profile/:id" element={<Profile/>} />
            </Routes>
        </BrowserRouter>
    );
>>>>>>> 9409cfe (react nonsense)
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