import React from 'react';
import styles from './NavBar.css';

const NavBar = () => {
  const patients = [
    { name: 'John Doe', id: 1 },
    { name: 'Cocaine Bear', id: 2 },
    { name: 'Some Weed Addict', id: 3 },
  ];

  const listPatients = patients.map(patient => (
    <li key={patient.id} style={{
      paddingLeft: '130px',
      margin: 0,
      listStyle: 'none',
      float: 'left',
    }}>
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
    paddingLeft: '20px',
    paddingTop: '20px',
    paddingBot: 0,
    margin: 0,
    width: '100%',
    height: '110px',
    backgroundColor: '#508AA8',
    fontSize: '70px',
    textAlign: 'left',
  };

  const topBarStyles = {
    paddingTop: '10px',
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