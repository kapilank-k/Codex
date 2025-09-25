import React, { useState, useMemo } from 'react';
import { FaPlay } from 'react-icons/fa'; // Import the play icon

// --- BACKEND PLACEHOLDER ---
// We've added a new module and a special subsection with `isInteraction: true`
const modulesData = [
  {
    id: 1,
    name: 'MODULE_GANDHI',
    subsections: [
        { id: 'g1', title: 'Biography' }, 
        { id: 'g2', title: 'Philosophy' },
        { id: 'g3', title: 'Interact with Gandhi', isInteraction: true },
    ]
  },
  { id: 2, name: 'MODULE_ALPHA', subsections: [{ id: 'a1', title: 'Mission Brief' }, { id: 'a2', title: 'System Logs' }] },
  { id: 3, name: 'MODULE_BETA', subsections: [{ id: 'b1', title: 'Target Profiles' }, { id: 'b2', title: 'Network Map' }] },
];
// --- END BACKEND PLACEHOLDER ---

// The component now accepts an onPlayGame prop and optional modulesData
const LeftPanel = ({ onStartInteraction, onPlayGame, modulesData: externalModules, onTopicSelected }) => {
  const data = useMemo(() => {
    if (Array.isArray(externalModules) && externalModules.length > 0) return externalModules;
    return modulesData;
  }, [externalModules]);

  const [activeModule, setActiveModule] = useState(data[0]?.id);

  const handleModuleClick = (moduleId) => {
    setActiveModule(activeModule === moduleId ? null : moduleId);
  };

  const handleSubsectionClick = (subsection) => {
    if (subsection.isInteraction) {
      onStartInteraction(subsection);
    } else {
      if (typeof onTopicSelected === 'function') onTopicSelected(subsection.title);
    }
  };

  const selectedModule = data.find(m => m.id === activeModule);

  return (
    <div className="pixel-frame h-full overflow-y-scroll pr-2" style={{ scrollbarGutter: 'stable' }}>
      <div className="pixel-frame-content p-4 text-[#60A5FA] flex flex-col h-full">
        {/* This div will grow, pushing the footer with the button to the bottom */}
        <div className="flex-grow overflow-y-scroll pr-2 max-h-[calc(100vh-10rem)]" style={{ scrollbarGutter: 'stable' }}>
          <div className="flex flex-col gap-4">
            {data.map((module) => (
              <div key={module.id}>
                <h2
                  className={`font-pixel cursor-pointer p-2 text-sm md:text-base ${activeModule === module.id ? 'bg-[#F28500] text-[#0F110C]' : 'hover:bg-[#F28500]/20'}`}
                  onClick={() => handleModuleClick(module.id)}
                >
                  {`> ${module.name}`}
                </h2>
                {activeModule === module.id && selectedModule && (
                  <div className="pl-6 pt-2 flex flex-col gap-1 font-mono">
                    {selectedModule.subsections.map((sub) => (
                      <p 
                        key={sub.id} 
                        className="text-sm cursor-pointer hover:underline"
                        onClick={() => handleSubsectionClick(sub)}
                      >
                        {sub.title}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer containing the new PLAY button */}
        <div className="flex-shrink-0 pt-4 mt-4 border-t-2 border-[#F28500]/50">
          <button 
            onClick={onPlayGame} 
            className="pixel-button font-pixel text-sm w-full"
          >
            <FaPlay />
            <span>PLAY</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;
