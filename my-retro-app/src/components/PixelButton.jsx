import React from 'react';

const PixelButton = ({ label, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="
        bg-white text-black font-pixel-regular text-2xl px-8 py-2 border-4 
        border-black rounded-sm
        hover:bg-retro-pink hover:text-white transition-colors duration-100
      "
    >
      {label}
    </button>
  );
};

export default PixelButton;