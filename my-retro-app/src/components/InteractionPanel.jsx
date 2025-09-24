import React from 'react';
import { IoSend } from 'react-icons/io5';
import { FaMicrophone } from 'react-icons/fa';
import { FaArrowLeft } from "react-icons/fa";

// The PixelArtPlaceholder component remains the same
const PixelArtPlaceholder = () => (
    <svg width="128" height="128" viewBox="0 0 64 64" className="mx-auto" style={{ imageRendering: 'pixelated' }}>
        <rect fill="#0F110C" width="64" height="64" />
        <rect fill="#F28500" x="16" y="16" width="32" height="32" />
        <rect fill="#60A5FA" x="24" y="24" width="8" height="8" />
        <rect fill="#60A5FA" x="40" y="24" width="8" height="8" />
        <rect fill="#FF5964" x="24" y="40" width="24" height="8" />
    </svg>
);

const InteractionPanel = ({ target, onClose }) => {
  return (
    // THE FIX: Removed max-w-4xl and mx-auto. The panel now correctly fills the space given by App.jsx.
    <div className="pixel-frame h-full w-full animate-fade-in">
      <div className="pixel-frame-content p-4 sm:p-6 flex flex-col h-full relative">
        
        {/* Button Container: This keeps the button at the top */}
        <div className="flex-shrink-0 mb-4">
          <button 
            onClick={onClose} 
            className="pixel-button font-pixel text-sm"
          >
            <FaArrowLeft />
            <span>Back</span>
          </button>
        </div>

        {/* Main content area */}
        <div className="flex-grow flex flex-col justify-center items-center gap-4 text-center overflow-y-auto">
          <div className="w-full max-w-2xl">
            <div className="pixel-frame">
              <div className="pixel-frame-content p-4">
                <p className="text-white font-mono text-lg">
                  Greetings. I am {target.title}. Ask me anything about my life and my principles of non-violence.
                </p>
              </div>
            </div>
          </div>
          <div className="my-4">
            <PixelArtPlaceholder />
          </div>
        </div>

        {/* Bottom Input Form */}
        <div className="relative mt-4 flex-shrink-0">
          <input
            type="text"
            placeholder={`Speak with ${target.title}...`}
            className="w-full bg-[#0F110C] border-2 border-[#F28500] text-white p-3 pr-24 focus:outline-none focus:border-[#FF5964]"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 gap-3">
            <button className="text-[#F28500] hover:text-white">
              <FaMicrophone size={20} />
            </button>
            <button className="text-[#F28500] hover:text-white">
              <IoSend size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractionPanel;