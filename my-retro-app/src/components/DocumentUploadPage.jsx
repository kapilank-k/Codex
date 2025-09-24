import React, { useRef, useState } from 'react';
import RetroGameBackground from './RetroGameBackground';
import PixelCursor from '../assets/pixel-hand.png';

const DocumentUploadPage = ({ onStartMainApp }) => {
  const fileInputRef = useRef();
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      if (!allowedTypes.includes(file.type)) {
        setError('Only PDF and Word files are allowed.');
        setSelectedFile(null);
      } else {
        setError('');
        setSelectedFile(file);
      }
    }
  };

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
          <h1 className="text-5xl md:text-7xl font-pixel text-[#FF0081] mb-4">
            Document Upload
          </h1>
          <p className="text-xl md:text-2xl font-pixel-regular text-[#EF7B45]">
            Upload your PDF or Word document below
          </p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="bg-[#222222] text-[#EF7B45] font-pixel-regular text-lg px-4 py-2 border-4 border-[#FF0081] rounded-sm mb-4 focus:outline-none"
        />
        {error && (
          <div className="text-[#FF0081] font-pixel-regular mb-2">{error}</div>
        )}
        {selectedFile && (
          <div className="text-[#EF7B45] font-pixel-regular mb-2">
            Selected file: {selectedFile.name}
          </div>
        )}
        <button
          className="bg-[#EF7B45] text-[#222222] font-pixel-regular text-xl px-8 py-2 border-4 border-[#FF0081] rounded-sm transition-colors duration-200 hover:bg-[#FF0081] hover:text-white"
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
        >
          Choose File
        </button>
          <button
            className="bg-[#FF0081] text-white font-pixel-regular text-xl px-8 py-2 border-4 border-[#EF7B45] rounded-sm transition-colors duration-200 hover:bg-[#EF7B45] hover:text-[#222222] mt-6"
            onClick={typeof onStartMainApp === 'function' ? onStartMainApp : undefined}
          >
            START
          </button>
      </div>
    </div>
  );
}

export default DocumentUploadPage;
