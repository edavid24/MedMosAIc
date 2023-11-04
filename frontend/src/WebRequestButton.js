import React, { useState } from 'react';

function WebRequestButton() {
  const [buttonText, setButtonText] = useState('Check Drug');
  const [responseData, setResponseData] = useState('');

  const makeRequest = () => {
    // Make a web request using the fetch API
    fetch('https://rxnav.nlm.nih.gov/REST/drugs.json?name=cymbalta') // Replace with your API URL
      .then((response) => response.json())
      .then((data) => {
        setResponseData(data); // Update the state with the response data
        setButtonText('Request Completed');
      })
      .catch((error) => {
        console.error('Error:', error);
        setButtonText('Request Failed');
      });
  };

  return (
    <div>
      <button onClick={makeRequest}>{buttonText}</button>
      <p>Response Data: {JSON.stringify(responseData)}</p>
    </div>
  );
}

export default WebRequestButton;