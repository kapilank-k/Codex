import React from 'react';

const PixelButton = ({ label, onClick }) => {
  return (
    <button 
      onClick={onClick}
      // We removed padding from the button itself to let the inner div handle it.
      className={`pixel-frame bg-[#F28500] hover:bg-[#ff9a21] text-[#0F110C] font-pixel text-sm ${className}`}
    >
      {/* This inner div now controls the padding, ensuring content never touches the border */}
      <div className="pixel-frame-content !bg-transparent flex items-center justify-center gap-2 px-4 py-2">
        {children}
      </div>
    </button>
  );
};

export default PixelButton;