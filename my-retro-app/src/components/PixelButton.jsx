import React from 'react';

const PixelButton = ({ onClick, children, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`pixel-frame !p-2 bg-[#F28500] hover:bg-[#ff9a21] text-[#0F110C] font-pixel text-sm ${className}`}
    >
      <div className="pixel-frame-content !bg-transparent flex items-center justify-center gap-2">
        {children}
      </div>
    </button>
  );
};

export default PixelButton;