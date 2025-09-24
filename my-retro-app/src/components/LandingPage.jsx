import React, { useEffect } from 'react';
import PixelButton from './PixelButton'; // Make sure this import is correct
import PixelCursor from '../assets/pixel-hand.png';

const LandingPage = ({ onStartGame }) => {
  // This useEffect hook correctly applies the custom cursor style to the page
  useEffect(() => {
    document.body.style.cursor = `url(${PixelCursor}), auto`;
    // Cleanup function to reset the cursor when we leave the landing page
    return () => {
      document.body.style.cursor = 'default';
    };
  }, []); // The empty array ensures this runs only once when the component mounts

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#222222] text-white p-4">
      <div className="text-center mb-12">
        <h1 className="text-6xl md:text-8xl font-pixel text-[#FF0081] mb-8">
          S  Y  G  L
        </h1>
        <p className="text-2xl md:text-3xl font-pixel-regular text-[#EF7B45]">
          A new adventure awaits...
        </p>
      </div>

      <div className="flex flex-col space-y-4">
        {/* The onClick handler triggers the view change in App.jsx */}
        <PixelButton label="START" onClick={onStartGame} />
      </div>

      <div className="absolute bottom-8 right-8">
        <div className="bg-[#222222] border-2 border-[#707070] p-4 text-[#FFFFFF] font-pixel-regular text-sm">
          <p>Version 1.0.0</p>
          <p>2025 ALL RIGHTS RESERVED</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
