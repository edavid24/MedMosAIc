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
            <div id="patient-name">{patientData.patient.first_name + " " + patientData.patient.last_name}</div>
            <div className="triplet-container">
                <div className="triplet patient-mosaic">
                    <h2>Patient Information</h2>
                    <p><span style={{ "fontWeight": "bold" }}>Gender:</span> {patientData.demographics.gender.name}</p>
                    {Object.keys(patientData.vitals[0].results).map((property, index) => (
                        <p
                            key={index}
                        >
                            <span style={{ "fontWeight": "bold" }}>{patientData.vitals[0].results[index].code.name}</span> {patientData.vitals[0].results[index].value} {patientData.vitals[0].results[index].unit}
                        </p>
                    ))}

                    {Object.keys(patientData.allergies).map((property, index) => (
                        <p
                            key={index}
                        >
                            <span style={{ "fontWeight": "bold" }}>Allergy:</span> {patientData.allergies[index].reaction} ({patientData.allergies[index].severity})
                        </p>
                    ))}
                </div>
                <div className='triplet'>
                    <Checklist props={drugs} />
                </div>
                <div className={`triplet ${isHidden ? 'hide' : ''}`} id='editor'>
                    <WebRequestButton importD={loaded} sendDrugs={getData} />
                </div>
            </div>
        </div>
    );
}
// <button onClick={handleButtonClick}>DISAPPEAR</button>
export default PatientBoxes;
