import React, { useState } from 'react';
import "./Warning.css"
function Warning({ errorMessage }) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClick = () => {
    setIsVisible(false);
  };

  return isVisible ? (
    <div className="warning-div" onClick={handleClick}>
      <p className="error-message">{errorMessage}</p>
    </div>
  ) : null;
}

export default Warning;