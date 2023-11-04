import React, { useState } from 'react';
import styles from './NavBar.css';

const NavBar = () => {
  const [hoveredButtonId, setHoveredButtonId] = useState(null);

  const patients = [
    { name: 'John Doe', id: 1 },
    { name: 'Cocaine Bear', id: 2 },
    { name: 'Some Weed Addict', id: 3 },
  ];

  const listPatients = patients.map(patient => (
    <li
      key={patient.id}
      style={{
        padding: '10px',
        height: '60px',
        marginLeft: '130px',
        margin: 0,
        listStyle: 'none',
        float: 'left',
        backgroundColor: patient.id === hoveredButtonId ? '#55A0DD' : 'transparent', // Apply black background to the hovered button
      }}
      onMouseEnter={() => setHoveredButtonId(patient.id)}
      onMouseLeave={() => setHoveredButtonId(null)}
    >
      Patient {patient.id}: {patient.name}
    </li>
  ));

  const mainStyles = {
    padding: 0,
    margin: 0,
    width: '100%',
    backgroundColor: '#9DD1F1',
    color: 'white',
  };

  const titleStyles = {
    paddingLeft: '2%',
    paddingTop: '20px',
    paddingBottom: '15px',
    margin: 0,
    width: '98%',
    height: '110px',
    backgroundColor: '#508AA8',
    fontSize: '70px',
    textAlign: 'left',
  };

  const topBarStyles = {
    padding: 0,
    margin: 0,
    width: '100%',
    height: '60px',
    fontSize: '40px',
    overflow: 'hidden',
  };

  const menuBar = {
    padding: 0,
    margin: 0,
  };

  return (
    <div style={mainStyles}>
      <div style={titleStyles}>
        Team Name
      </div>
      <div style={topBarStyles}>
        <ul style={menuBar}>
          {listPatients}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;