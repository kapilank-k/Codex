import React from 'react';

const PixelButton = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-[#EF7B45] text-[#222222] font-pixel text-2xl py-3 px-16 border-4 border-t-[#FFFFFF] border-l-[#FFFFFF] border-b-[#707070] border-r-[#707070] active:border-t-[#707070] active:border-l-[#707070] active:border-b-[#FFFFFF] active:border-r-[#FFFFFF] transition-colors"
    >
      {label}
    </button>
  );
};

export default PixelButton;
