import React, { useState } from 'react';
import { XMLParser } from "fast-xml-parser";

function WebRequestButton() {
    const [drugName, setDrug] = useState("");
    const [buttonText, setButtonText] = useState('Check Drug');
    const [responseData, setResponseData] = useState('');
    const parser = new XMLParser();
    const BASE_URL = " https://rxnav.nlm.nih.gov"

    const handleChange = (event) => {
        const value = event.target.value;
        setDrug(value);
    };

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
                        setButtonText('Request Completed');
                        return;
                    }
                    bob = bob.fullInteractionTypeGroup[0]

                    if (!("fullInteractionType" in bob)) {
                        setResponseData("No warnings!")
                        setButtonText('Request Completed');
                        return;
                    }
                    setResponseData(bob.fullInteractionType[0].comment);
                    setButtonText('Request Completed');


                    })

            })
            .catch((error) => {
                console.error('Error:', error);
                setButtonText('Request Failed');
            });
    };
    
    return (
        <div>
            <input onChange={handleChange}></input>
            <button onClick={makeRequest}>{buttonText}</button>
            <p>Response Data: {JSON.stringify(responseData)}</p>
        </div>
    );
}

export default WebRequestButton;