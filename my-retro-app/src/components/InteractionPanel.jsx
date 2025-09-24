import React from 'react';
import { IoSend } from 'react-icons/io5';
import { FaMicrophone } from 'react-icons/fa';
// Import the back arrow icon and our new button
import { FaArrowLeft } from "react-icons/fa";
import PixelButton from './PixelButton';

// The PixelArtPlaceholder component remains the same...
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
    <div className="pixel-frame h-full w-full max-w-4xl mx-auto animate-fade-in">
        <div className="pixel-frame-content p-4 sm:p-6 flex flex-col justify-between h-full relative">
            
            {/* New Back Button */}
            <div className="absolute top-0 left-0 mt-3 ml-3 z-10">
                <PixelButton onClick={onClose}>
                    <FaArrowLeft />
                    <span>Back</span>
                </PixelButton>
            </div>

            {/* Main content area - no changes here */}
            <div className="flex-grow flex flex-col justify-center items-center gap-4 text-center pt-12">
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

            {/* Bottom Input Form - no changes here */}
            <div className="relative mt-4">
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