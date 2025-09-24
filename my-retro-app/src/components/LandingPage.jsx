import React from 'react';
import PlanetBackground from './RetroGameBackground'; 
import PixelCursor from '../assets/pixel-hand.png';
import RetroGameBackground from './RetroGameBackground';

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
            SYGL
          </h1>
          <p className="text-2xl md:text-3xl font-pixel-regular text-[#EF7B45]">
            learning through exploring, it's history but with a twist....
          </p>
        </div>

        <button 
          onClick={onStartGame} 
          className="
            bg-[#EF7B45] text-[#222222] font-pixel-regular text-2xl px-8 py-2 border-4 
            border-[#FF0081] rounded-sm transition-colors duration-200
            hover:bg-[#FF0081] hover:text-white
          "
        >
          START
        </button>

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