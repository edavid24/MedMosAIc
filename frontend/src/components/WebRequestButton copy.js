import React, { useState } from 'react';
import { XMLParser } from "fast-xml-parser";
import './PatientMosaic.css';
import './WebRequestButton.css';

function WebRequestButton() {
    const [drugName, setDrug] = useState("Heroin");
    const [dosage, setDosage] = useState("");
    const [time, setTime] = useState("");
    const [allDosages, setAllDosages] = useState([{ drug: "Heroin", dosages: [{time: "a", dosage: "bob"}]}]);
    const [responseData, setResponseData] = useState('');
    const parser = new XMLParser();
    const BASE_URL = " https://rxnav.nlm.nih.gov";

    const handleChange = (event) => {
        const value = event.target.value;
        setDrug(value);
    };
    const changeDosage = (event) => {
        const value = event.target.value;
        setDosage(value);
    };
    const changeTime = (event) => {
        const value = event.target.value;
        setTime(value);
    };
    const changeDrugs = () => {
         
        setAllDosages([...allDosages, { time: time, dosage: dosage }]);
        this.props.sendDosages({dosages: allDosages})
    }


    const endpointURL = (endpoint, name, ids) => {
        var endpoints = {
            GETID: `/REST/drugs.xml?name=${name}`,
            GETINTERACTION: `/REST/interaction/list.json?rxcuis=${ids}&sources=ONCHigh`
        }
        return BASE_URL + endpoints[endpoint];
    }

    const makeRequest = () => {
        fetch(endpointURL("GETID", drugName, ""))
            .then((response) => response.text())
            .then((xml) => {
                var drugs = [];
                while (xml.search("<conceptProperties>") != -1) {
                    drugs.push(parser.parse(xml.substring(xml.indexOf("<conceptProperties>"), xml.indexOf("</conceptProperties>")) + "</conceptProperties>"))
                    xml = xml.substring(xml.indexOf("</conceptProperties>") + 15, xml.length);
                }

                var id1 = drugs[0].conceptProperties.rxcui;
                var id2 = drugs[1].conceptProperties.rxcui;
                fetch(endpointURL("GETINTERACTION", "", id1 + '+' + id2))
                    .then((res) => res.json())
                    .then((bob) => {


                        if (!("fullInteractionTypeGroup" in bob)) {
                            setResponseData("No warnings!"); // Update the state with the response data
                            return;
                        }
                        bob = bob.fullInteractionTypeGroup[0]

                        if (!("fullInteractionType" in bob)) {
                            setResponseData("No warnings!")
                            return;
                        }
                        setResponseData(bob.fullInteractionType[0].comment);


                    })

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div id='drugs'>
            <h2>Edit Prescriptions</h2>
            <input id="drugName" onChange={handleChange}></input>
            <button className="submit" onClick={makeRequest}>Add</button>
            <div>
                Dosage:
                <input onChange={changeDosage}></input>
                Time:
                <input onChange={changeTime}></input>
                <button onClick={changeDrugs}>Set</button>
            </div>
            <div id="warning">
                <h2>{responseData}</h2>
            </div>
            <div>
                <ul>
                    {allDosages[0].dosages.map((item, index) => (
                        <div className='ends' key={index}>
                            <div>
                                {item.time}
                            </div>
                            <div>
                                {item.dosage}
                            </div>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default WebRequestButton;