import React from 'react';
import './RetroGameBackground.css'; // We'll create this file next

const RetroGameBackground = () => {
  return (
    <div className="background-container">
      <div className="stars"></div>
      
      {/* Saturn-like planet from the image */}
      <div className="planet-container saturn-position">
        <div className="saturn-body"></div>
        <div className="saturn-ring"></div>
      </div>

      {/* Striped planet from the image */}
      <div className="planet-container striped-planet-position">
        <div className="striped-planet-body"></div>
      </div>
    </div>
  );
};

export default RetroGameBackground;