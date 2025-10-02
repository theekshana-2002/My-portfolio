import React from 'react';
import './SimpleBackground.css';

const SimpleBackground = () => {
  return (
    <div className="simple-background">
      {/* Animated gradient background */}
      <div className="gradient-bg"></div>
      
      {/* Floating particles */}
      <div className="particles">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>
        <div className="particle particle-6"></div>
        <div className="particle particle-7"></div>
        <div className="particle particle-8"></div>
      </div>
      
      {/* Animated orbs */}
      <div className="orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
        <div className="orb orb-4"></div>
      </div>
    </div>
  );
};

export default SimpleBackground;
