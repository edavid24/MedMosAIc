import React from 'react';
import './../App.css'; // Create the corresponding CSS file
import { Link } from "react-router-dom";
function Logo({ text }) {
  // Read the dark mode preference from local storage
  const darkMode = localStorage.getItem('darkMode') === 'true';
  return (<Link to="/"><h1 className={`logo ${darkMode ? 'dark-mode' : ''}`}>Med<span style={{ color: '#007BFF' }}>Mosaic</span></h1></Link>);
}

export default Logo;