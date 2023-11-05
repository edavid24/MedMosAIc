import React, { useState } from 'react';
import "./Warning.css"
function Confirmation() {
  const [isVisible, setIsVisible] = useState(true);

  const handleClick = () => {
    setIsVisible(false);
  };

  return isVisible ? (
    <div className="confirmation-div" onClick={handleClick}>
      <p className="confirmation-message">No harmful interactions found.</p>
    </div>
  ) : null;
}

export default Confirmation;