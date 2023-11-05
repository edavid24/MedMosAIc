import React,{useState , useEffect} from 'react';
import './Checklist.css';


function Checklist({props}) {
    const darkMode = localStorage.getItem('darkMode') === 'true';

    return (
        <div>
            <h2>Prescription Checklist</h2>
            <ul>
                {props.map((item, index) => (
                    <div className='checklist' key={index}>
                        {item.name}
                        <div className="listdown">
                            <label className={`container ${darkMode ? 'dark-mode' : ''}`}>Morning
                                <span className="checkmark"></span>
                                <input className="checkbox" type="checkbox" />
                            </label>
                            <label className={`container ${darkMode ? 'dark-mode' : ''}`}>Night
                                <span className="checkmark"></span>
                                <input className="checkbox" type="checkbox" />
                            </label>
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    );
}
// <button onClick={() => removeItem(index)}>Remove</button>
export default Checklist;
