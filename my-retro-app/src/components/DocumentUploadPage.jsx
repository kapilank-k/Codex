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

  const handleChooseFileClick = () => {
    // This will open the file dialog box
    fileInputRef.current.click();
  };

  return (
    <div className="relative overflow-hidden min-h-screen">
      <style jsx>{`
        body {
          cursor: url(${PixelCursor}), auto;
        }
        .pixel-button {
          font-family: 'pixel-regular', monospace;
          font-size: 1.25rem;
          padding: 0.5rem 2rem;
          border-width: 4px;
          border-style: solid;
          border-radius: 4px;
          transition-property: background-color, color;
          transition-duration: 200ms;
          cursor: pointer;
        }
        .pixel-button.choose-file {
          background-color: #EF7B45;
          color: #222222;
          border-color: #FF0081;
        }
        .pixel-button.choose-file:hover {
          background-color: #FF0081;
          color: white;
        }
        .pixel-button.start {
          background-color: #FF0081;
          color: white;
          border-color: #EF7B45;
          margin-top: 1.5rem;
        }
        .pixel-button.start:hover {
          background-color: #EF7B45;
          color: #222222;
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
        
        {/* The hidden input element that will handle the file selection */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          style={{ display: 'none' }} /* This is how we hide it */
        />

        {error && (
          <div className="text-[#FF0081] font-pixel-regular mb-2">{error}</div>
        )}
        {selectedFile && (
          <div className="text-[#EF7B45] font-pixel-regular mb-2">
            Selected file: {selectedFile.name}
          </div>
        )}

        {/* The "Choose File" button that triggers the hidden input */}
        <button
          className="pixel-button choose-file"
          onClick={handleChooseFileClick}
        >
          Choose File
        </button>

        {/* The "START" button */}
        <button
          className="pixel-button start"
          onClick={typeof onStartMainApp === 'function' ? onStartMainApp : undefined}
        >
          START
        </button>
      </div>
    </div>
  );
}

export default DocumentUploadPage;