import React from 'react';
import styles from './page.module.css';

function SideBar({ patients }) {
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
  return <ul>{listPatients}</ul>;
}

export default function Home() {
  const patients = [
    { name: 'John Doe', id: 1 },
    { name: 'Cocaine Bear', id: 2 },
    { name: 'Some Weed Addict', id: 3 },
  ];

  return (
    <div className={styles.main}>
      <div className={styles.titleName}>
        Team Name
      </div>
      <div className={styles.topBar}>
        <SideBar patients={patients} />
      </div>
    </div>
  );
}