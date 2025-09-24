import React, { useState, useEffect } from 'react';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import InteractionPanel from './components/InteractionPanel';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function App() {
  const [interactionTarget, setInteractionTarget] = useState(null);
  // New states to control side panel visibility in interaction mode
  const [isLeftPanelVisible, setLeftPanelVisible] = useState(false);
  const [isRightPanelVisible, setRightPanelVisible] = useState(false);

  const handleStartInteraction = (target) => {
    setInteractionTarget(target);
    // Ensure panels are collapsed when starting a new interaction
    setLeftPanelVisible(false);
    setRightPanelVisible(false);
  };

  const handleEndInteraction = () => {
    setInteractionTarget(null);
  };

  // This effect checks if both panels have been expanded
  useEffect(() => {
    if (isLeftPanelVisible && isRightPanelVisible) {
      // If both are open, end the interaction and return to the main view
      handleEndInteraction();
    }
  }, [isLeftPanelVisible, isRightPanelVisible]);


  return (
    <main className="bg-[#0F110C] min-h-screen p-4 sm:p-8 font-mono overflow-hidden">
      <div className="container mx-auto h-[calc(100vh-2rem)] sm:h-[calc(100vh-4rem)] relative">
        {interactionTarget ? (
          // INTERACTION MODE VIEW
          <>
            {/* Expansion Triggers */}
            {!isLeftPanelVisible && (
              <button 
                onClick={() => setLeftPanelVisible(true)}
                className="absolute top-1/2 -translate-y-1/2 left-0 z-20 bg-[#F28500] p-3 rounded-r-lg text-[#0F110C] hover:bg-[#ff9a21]">
                <FaArrowRight />
              </button>
            )}
            {!isRightPanelVisible && (
              <button 
                onClick={() => setRightPanelVisible(true)}
                className="absolute top-1/2 -translate-y-1/2 right-0 z-20 bg-[#F28500] p-3 rounded-l-lg text-[#0F110C] hover:bg-[#ff9a21]">
                <FaArrowLeft />
              </button>
            )}

            {/* Central Panel */}
            <div className="absolute inset-0 md:inset-x-1/4 transition-all duration-300">
               <InteractionPanel target={interactionTarget} onClose={handleEndInteraction} />
            </div>

            {/* Expandable Left Panel */}
            <div className={`absolute top-0 left-0 h-full w-full md:w-1/3 z-10 transition-transform duration-300 ease-in-out ${isLeftPanelVisible ? 'translate-x-0' : '-translate-x-full'}`}>
              <LeftPanel onStartInteraction={handleStartInteraction} />
            </div>

            {/* Expandable Right Panel */}
            <div className={`absolute top-0 right-0 h-full w-full md:w-1/3 z-10 transition-transform duration-300 ease-in-out ${isRightPanelVisible ? 'translate-x-0' : 'translate-x-full'}`}>
              <RightPanel />
            </div>
          </>
        ) : (
          // DEFAULT TWO-PANEL VIEW
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
            <div>
              <LeftPanel onStartInteraction={handleStartInteraction} />
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