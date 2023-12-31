import React, { useEffect, useState } from 'react';
import { XMLParser } from "fast-xml-parser";
import WebRequestButton from '../components/WebRequestButton';
import Checklist from '../components/Checklist';
import './PatientMosaic.css'; // Create the corresponding CSS file

function PatientBoxes({ patientData }) {
    const [isHidden, setIsHidden] = useState(false);
    const [drugs, setDrugs] = useState([]);
    const [loaded, setLoaded] = useState([]);
    const parser = new XMLParser();
    const BASE_URL = "https://rxnav.nlm.nih.gov";
    const darkMode = localStorage.getItem('darkMode') === 'true';


    useEffect(() => {
        makeRequest();
        console.log(patientData)
    }, [ patientData ])


    const getData = (val) => {
        setDrugs(val);
    }

    const handleButtonClick = () => {
        setIsHidden(true);
    };
    const endpointURL = (endpoint, name, ids) => {
        var endpoints = {
            GETID: `/REST/drugs.xml?name=${name}`,
            GETINTERACTION: `/REST/interaction/list.json?rxcuis=${ids}`
        }
        return BASE_URL + endpoints[endpoint];
    }



    const makeRequest = async () => {
        var allD = [];
        for (var k = 0; k < patientData.medications.length; k++) {
            var response = await fetch(endpointURL("GETID", patientData.medications[k].product.code.name.split(" ")[0], ""))
            var xml = await response.text(); 
            var drugResults = [];
            while (xml.search("<conceptProperties>") != -1) {
                drugResults.push(parser.parse(xml.substring(xml.indexOf("<conceptProperties>"), xml.indexOf("</conceptProperties>")) + "</conceptProperties>"))
                xml = xml.substring(xml.indexOf("</conceptProperties>") + 15, xml.length);
            }
            allD.push({name: patientData.medications[k].product.code.name.split(" ")[0] , id: drugResults[0].conceptProperties.rxcui});

        }
        await setLoaded(allD);
        await setDrugs(allD);
    };




    return (
        <div>
            <div id="patient-name" className={`${darkMode ? 'dark-mode' : ''}`}>{patientData.patient.first_name + " " + patientData.patient.last_name}</div>
            <div className="triplet-container">
                <div className={`triplet patient-mosaic ${darkMode ? 'dark-mode' : ''}`}>
                    <h2>Patient Information</h2>
                    <p>
                        <span style={{ "fontWeight": "bold" }}>Gender:</span> 
                        <span className={`${darkMode ? 'white' : ''}`} style={{ "float": "right" }}>{patientData.demographics.gender.name}</span>
                    </p>
                    {Object.keys(patientData.vitals[0].results).map((property, index) => (
                        <p
                            key={index}
                        >
                            <span style={{ "fontWeight": "bold" }}>{patientData.vitals[0].results[index].code.name}:</span> 
                            <span className={`${darkMode ? 'white' : ''}`} style={{ "float": "right" }}>{patientData.vitals[0].results[index].value} {patientData.vitals[0].results[index].unit}</span>
                        </p>
                    ))}

                    {Object.keys(patientData.allergies).map((property, index) => (
                        <p
                            key={index}
                        >
                            <span style={{ "fontWeight": "bold" }}>Allergy:</span> 
                            <span className={`${darkMode ? 'white' : ''}`}  style={{ "float": "right" }}>{patientData.allergies[index].reaction} ({patientData.allergies[index].severity})</span>
                        </p>
                    ))}
                </div>
                <div className={`triplet ${darkMode ? 'dark-mode' : ''}`}>
                    <Checklist props={drugs} />
                </div>
                <div className={`triplet ${isHidden ? 'hide' : ''} ${darkMode ? 'dark-mode' : ''}`} id='editor'>
                    <WebRequestButton importD={loaded} sendDrugs={getData} />
                </div>
            </div>
        </div>
    );
}
// <button onClick={handleButtonClick}>DISAPPEAR</button>
export default PatientBoxes;
