import React, { useEffect, useState } from 'react';
import { XMLParser } from "fast-xml-parser";
import Warning from "./Warning.js";
import Confirmation from "./Confirmation.js";
import './PatientMosaic.css';
import './WebRequestButton.css';

function WebRequestButton({ importD, sendDrugs }) {
    const parser = new XMLParser();
    const BASE_URL = "https://rxnav.nlm.nih.gov";

    const [warnings, setWarnings] = useState([]);
    const [confirmations, setConfirmations] = useState([]);
    const [drugs, setDrugs] = useState([]);
    const [drugInput, setDrugInput] = useState("");

    const updateDrugInput = (e) => {
        setDrugInput(e.target.value);
    }

    useEffect(() => {
        sendDrugs(drugs);
    }, [ drugs ])

    useEffect(() => { setDrugs(importD) } , [importD])

    const endpointURL = (endpoint, name, ids) => {
        var endpoints = {
            GETID: `/REST/drugs.xml?name=${name}`,
            GETINTERACTION: `/REST/interaction/list.json?rxcuis=${ids}`
        }
        return BASE_URL + endpoints[endpoint];
    }

    const makeRequest = () => {
        document.getElementById("drugName").value = ""; 
        fetch(endpointURL("GETID", drugInput, ""))
            .then((response) => response.text())
            .then((xml) => {
                var drugResults = [];
                while (xml.search("<conceptProperties>") != -1) {
                    drugResults.push(parser.parse(xml.substring(xml.indexOf("<conceptProperties>"), xml.indexOf("</conceptProperties>")) + "</conceptProperties>"))
                    xml = xml.substring(xml.indexOf("</conceptProperties>") + 15, xml.length);
                }

                var ids = drugResults[0].conceptProperties.rxcui;
                for (var i = 0; i < drugs.length; i++) {
                    ids = `${ids}+${drugs[i].id}`;
                }
                fetch(endpointURL("GETINTERACTION", "", ids))
                    .then((res) => res.json())
                    .then((res) => {
                        if (!("fullInteractionTypeGroup" in res)) {
                            createConfirmation(); 
                            setDrugs([...drugs, {name: drugInput, id: drugResults[0].conceptProperties.rxcui}]);
                            return;
                        }
                        res = res.fullInteractionTypeGroup[0]

                        if (!("fullInteractionType" in res)) {
                            createConfirmation(); 
                            setDrugs([...drugs, {name: drugInput, id: drugResults[0].conceptProperties.rxcui}]);
                            return;
                        }
                        createWarning(res.fullInteractionType[0].comment);

                    })

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };
    
    const createWarning = (e) => {
       setWarnings([...warnings, e]);
    }
    const createConfirmation = () => {
       setConfirmations([...confirmations, 1]);
    }


    return (
        <div id='drugs'>
            <h2>Add Prescriptions</h2>
            <input id="drugName" onChange={updateDrugInput} ></input>
            <button className="submit" onClick={makeRequest}>Add</button>
            <div id="warnings">
                {warnings.map((item, index) => (
                   <Warning key={index} errorMessage={item}/>
                ))}
            </div>
            <div id="confirmations">
                {confirmations.map((item, index) => (
                   <Confirmation key={index} />
                ))}
            </div>
            
        </div>
    );
}

export default WebRequestButton;