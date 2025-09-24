import React, { useState, useEffect } from 'react';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import InteractionPanel from './components/InteractionPanel';
import LandingPage from './components/LandingPage';
import Game from './components/GameItems/Game.jsx'; // 1. Import the new Game component
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function App() {
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [isGameActive, setIsGameActive] = useState(false); // 2. New state for the game view
  const [interactionTarget, setInteractionTarget] = useState(null);
  const [isLeftPanelVisible, setLeftPanelVisible] = useState(false);
  const [isRightPanelVisible, setRightPanelVisible] = useState(false);

  const handleStartApp = () => setShowLandingPage(false);
  
  // 3. New functions to control the game state
  const handlePlayGame = () => setIsGameActive(true);
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

  // --- 4. NEW TOP-LEVEL RENDER LOGIC ---
  if (showLandingPage) {
    return <LandingPage onStartGame={handleStartApp} />;
  }

  if (isGameActive) {
    return <Game onExitGame={handleExitGame} />;
  }
  
  // The main app view (no changes needed here)
  return (
    <main className="bg-[#0F110C] min-h-screen p-8 sm:p-12 font-mono overflow-hidden">
      <div className="container mx-auto h-[calc(100vh-4rem)] sm:h-[calc(100vh-6rem)] relative">
        {interactionTarget ? (
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
            <div>
              <LeftPanel onStartInteraction={handleStartInteraction} onPlayGame={handlePlayGame} />
            </div>
            <div>
              <RightPanel />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;

