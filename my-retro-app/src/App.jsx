// src/App.jsx

import React, { useState, useEffect } from 'react';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/UI_temp/RightPanel'; // Correct path to UI component
import InteractionPanel from './components/InteractionPanel';
import LandingPage from './components/LandingPage';
import DocumentUploadPage from './components/DocumentUploadPage';
import Game from './components/GameItems/Game.jsx'; // Correct path to Game component
import PixelArtBackground from './components/UI_temp/PixelArtBackground.jsx'; // 1. ADDED: Missing import
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function App() {
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [showUploadPage, setShowUploadPage] = useState(false);
  const [isGameActive, setIsGameActive] = useState(false);
  const [interactionTarget, setInteractionTarget] = useState(null);
  const [isLeftPanelVisible, setLeftPanelVisible] = useState(false);
  const [isRightPanelVisible, setRightPanelVisible] = useState(false);

  // 2. FIXED: Function body was not correctly enclosed in curly braces {}
  const handleStartApp = () => {
    setShowLandingPage(false);
    setShowUploadPage(true);
  };
  
  const handlePlayGame = () => {
    setShowUploadPage(false); // Ensure upload page is hidden when game starts
    setIsGameActive(true);
  }
  const handleExitGame = () => setIsGameActive(false);

  const handleStartInteraction = (target) => {
    setInteractionTarget(target);
    setLeftPanelVisible(false);
    setRightPanelVisible(false);
  };
  const handleEndInteraction = () => {
    setInteractionTarget(null);
  };

  useEffect(() => {
    if (isLeftPanelVisible && isRightPanelVisible) {
      handleEndInteraction();
    }
  }, [isLeftPanelVisible, isRightPanelVisible]);

  // --- TOP-LEVEL RENDER LOGIC ---
  if (showLandingPage) {
    return <LandingPage onStartGame={handleStartApp} />;
  }

  if (isGameActive) {
    return <Game onExitGame={handleExitGame} />;
  }

  if (showUploadPage) {
    return <DocumentUploadPage onStartMainApp={() => setShowUploadPage(false)} />;
  }
  
  // The main app view
  return (
    <main className="min-h-screen p-8 sm:p-12 font-mono overflow-hidden relative">
      <PixelArtBackground />
      <div className="relative z-10 h-full">
        <div className="container mx-auto h-[calc(100vh-4rem)] sm:h-[calc(100vh-6rem)] relative">
          {interactionTarget ? (
            // Interaction Mode Layout
            <div className="relative w-full h-full">
              <div className="flex w-full h-full gap-8">
                <div className={`transition-all duration-500 ease-in-out ${isLeftPanelVisible ? 'w-1/3' : 'w-0'}`}>
                  <div className="h-full overflow-hidden">
                    <LeftPanel onStartInteraction={handleStartInteraction} onPlayGame={handlePlayGame} />
                  </div>
                </div>
                <div className="flex-grow h-full">
                  <InteractionPanel target={interactionTarget} onClose={handleEndInteraction} />
                </div>
                <div className={`transition-all duration-500 ease-in-out ${isRightPanelVisible ? 'w-1/3' : 'w-0'}`}>
                  <div className="h-full overflow-hidden">
                    <RightPanel />
                  </div>
                </div>
              </div>
              <button
                onClick={() => setLeftPanelVisible(!isLeftPanelVisible)}
                className="absolute top-1/2 -translate-y-1/2 left-0 z-30 bg-[#F28500] p-3 rounded-r-lg text-[#0F110C] hover:bg-[#ff9a21]"
                aria-label="Toggle Left Panel"
              >
                {isLeftPanelVisible ? <FaArrowLeft /> : <FaArrowRight />}
              </button>
              <button
                onClick={() => setRightPanelVisible(!isRightPanelVisible)}
                className="absolute top-1/2 -translate-y-1/2 right-0 z-30 bg-[#F28500] p-3 rounded-l-lg text-[#0F110C] hover:bg-[#ff9a21]"
                aria-label="Toggle Right Panel"
              >
                {isRightPanelVisible ? <FaArrowRight /> : <FaArrowLeft />}
              </button>
            </div>
          ) : (
            // Default Two-Panel View
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
              <div>
                {/* 3. FIXED: Added the missing onPlayGame prop */}
                <LeftPanel onStartInteraction={handleStartInteraction} onPlayGame={handlePlayGame} />
              </div>
              <div>
                <RightPanel />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;