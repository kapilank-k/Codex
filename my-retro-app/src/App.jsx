import React, { useState, useEffect } from 'react';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import InteractionPanel from './components/InteractionPanel';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function App() {
  const [interactionTarget, setInteractionTarget] = useState(null);
  const [isLeftPanelVisible, setLeftPanelVisible] = useState(false);
  const [isRightPanelVisible, setRightPanelVisible] = useState(false);

  const handleStartInteraction = (target) => {
    setInteractionTarget(target);
    setLeftPanelVisible(false); // Start with panels collapsed
    setRightPanelVisible(false);
  };

  const handleEndInteraction = () => {
    setInteractionTarget(null);
  };

  useEffect(() => {
    // This logic is correct and remains: if both panels are expanded, go back to the default view.
    if (isLeftPanelVisible && isRightPanelVisible) {
      handleEndInteraction();
    }
  }, [isLeftPanelVisible, isRightPanelVisible]);

  return (
    <main className="bg-[#0F110C] min-h-screen p-8 sm:p-12 font-mono overflow-hidden">
      <div className="container mx-auto h-[calc(100vh-4rem)] sm:h-[calc(100vh-6rem)] relative">
        {interactionTarget ? (
          // --- NEW, ROBUST FLEXBOX-BASED INTERACTION MODE LAYOUT ---
          <div className="relative w-full h-full">
            {/* The main layout container now uses Flexbox */}
            <div className="flex w-full h-full gap-8">
              
              {/* Left Panel Wrapper */}
              {/* Its width changes smoothly from 0 to 1/3 of the space */}
              <div className={`transition-all duration-500 ease-in-out ${isLeftPanelVisible ? 'w-1/3' : 'w-0'}`}>
                <div className="h-full overflow-hidden">
                  <LeftPanel onStartInteraction={handleStartInteraction} />
                </div>
              </div>

              {/* Central Panel Wrapper */}
              {/* It automatically grows to fill the available space */}
              <div className="flex-grow h-full">
                <InteractionPanel target={interactionTarget} onClose={handleEndInteraction} />
              </div>

              {/* Right Panel Wrapper */}
              {/* Its width also changes smoothly */}
              <div className={`transition-all duration-500 ease-in-out ${isRightPanelVisible ? 'w-1/3' : 'w-0'}`}>
                <div className="h-full overflow-hidden">
                  <RightPanel />
                </div>
              </div>

            </div>

            {/* Expansion Triggers - These sit on top of the Flexbox layout */}
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
          // --- DEFAULT TWO-PANEL VIEW (This layout is correct) ---
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

