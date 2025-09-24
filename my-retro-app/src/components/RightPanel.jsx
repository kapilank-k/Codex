import React from 'react';
import { IoSend } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa";

const RightPanel = () => {
  return (
    // Use the new jagged-border class
    <div className="jagged-border h-full">
        {/* The inner div will have the dark background */}
        <div className="bg-[#0F110C] h-full p-6 flex flex-col justify-between">
            {/* Top Title - No changes here */}
            <h1 className="text-center font-pixel text-4xl text-[#FF5964]">
                S Y G L
            </h1>

            {/* Chat messages would go here */}
            <div className="flex-grow">
                {/* Placeholder for chat content */}
            </div>

            {/* Bottom Input Form */}
            <div className="relative">
                <input
                type="text"
                placeholder="Enter command..."
                // Updated border color to tangerine
                className="w-full bg-[#0F110C] border-2 border-[#F28500] text-white p-3 pr-24 focus:outline-none focus:border-[#FF5964]"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 gap-3">
                {/* Updated icon colors to tangerine */}
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

export default RightPanel;