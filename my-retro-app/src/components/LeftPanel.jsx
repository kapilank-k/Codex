import React, { useState } from 'react';

// --- BACKEND PLACEHOLDER ---
// We've added a new module and a special subsection with `isInteraction: true`
const modulesData = [ 
  {
    id: 1,
    name: 'MODULE_GANDHI',
    subsections: [
        { id: 'g1', title: 'Biography' }, 
        { id: 'g2', title: 'Philosophy' },
        // This is the special trigger subsection
        { id: 'g3', title: 'Interact with Gandhi', isInteraction: true },
    ]
  },
  {
    id: 2,
    name: 'MODULE_ALPHA',
    subsections: [{ id: 'a1', title: 'Mission Brief' }, { id: 'a2', title: 'System Logs' }]
  },
  {
    id: 3,
    name: 'MODULE_BETA',
    subsections: [{ id: 'b1', title: 'Target Profiles' }, { id: 'b2', title: 'Network Map' }]
  },
];
// --- END BACKEND PLACEHOLDER ---

const LeftPanel = ({ onStartInteraction }) => { // Accept the prop here
  const [activeModule, setActiveModule] = useState(modulesData[0].id);

  const handleModuleClick = (moduleId) => {
    setActiveModule(activeModule === moduleId ? null : moduleId);
  };

  const handleSubsectionClick = (subsection) => {
    // If the subsection is an interaction trigger, call the function from App.jsx
    if (subsection.isInteraction) {
      onStartInteraction(subsection);
    } else {
      // Handle normal subsection clicks here (e.g., display text, etc.)
      console.log("Clicked normal subsection:", subsection.title);
    }
  };

  const selectedModule = modulesData.find(m => m.id === activeModule);

  return (
    <div className="pixel-frame h-full">
        <div className="pixel-frame-content p-4 text-[#60A5FA] flex flex-col gap-4">
            {modulesData.map((module) => (
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
  );
};

export default LeftPanel;