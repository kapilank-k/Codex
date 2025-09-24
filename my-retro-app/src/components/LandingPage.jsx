import React from 'react';
import RetroGameBackground from './RetroGameBackground'; 
import PixelCursor from '../assets/pixel-hand.png';
import PixelButton from './PixelButton'; // Import the new PixelButton component

const LandingPage = ({ onStartGame }) => {
  return (
    <div className="relative overflow-hidden min-h-screen">
      <style jsx>{`
        body {
          cursor: url(${PixelCursor}), auto;
        }
      `}</style>
      
      <RetroGameBackground /> 

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white p-4">
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-8xl font-pixel text-[#FF0081] mb-4">
            S Y G L
          </h1>
          <p className="text-2xl md:text-3xl font-pixel-regular text-[#EF7B45]">
            learning through exploring, it's history but with a twist....
          </p>
        </div>

        {/* Replaced the old button with the new PixelButton component */}
        <PixelButton 
          onClick={onStartGame} 
          type="primary" // This style matches the original button's colors
        >
          START
        </PixelButton>

        <div className="absolute bottom-8 right-8">
          <div className="bg-[#222222] border-2 border-[#707070] p-4 text-[#FFFFFF] font-pixel-regular text-sm">
            <p>Version 1.0.0</p>
            <p>2025 ALL RIGHTS RESERVED</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;