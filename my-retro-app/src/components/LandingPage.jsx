import React from 'react';
import PixelButton from './PixelButton';
import PixelCursor from '../assets/pixel-hand.png';

// Receive the onStartGame prop
const LandingPage = ({ onStartGame }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#222222] text-white p-4">
      <style jsx>{`
        body {
          cursor: url(${PixelCursor}), auto;
        }
      `}</style>
      
      <div className="text-center mb-12">
        <h1 className="text-6xl md:text-8xl font-pixel text-[#FF0081] mb-4">
          PIXELVERSE
        </h1>
        <p className="text-2xl md:text-3xl font-pixel-regular text-[#EF7B45]">
          A new adventure awaits...
        </p>
      </div>

      <div className="flex flex-col space-y-4">
        {/* The onClick handler is what triggers the view change */}
        <PixelButton label="START" onClick={onStartGame} />
        <PixelButton label="LOAD GAME" />
        <PixelButton label="SETTINGS" />
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