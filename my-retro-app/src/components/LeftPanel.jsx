import React, { useState } from 'react';

// --- BACKEND PLACEHOLDER ---
const modulesData = [
  {
    id: 1,
    name: 'MODULE_ALPHA',
    subsections: [{ id: 'a1', title: 'Mission Brief' }, { id: 'a2', title: 'System Logs' }, { id: 'a3', title: 'Core Schematics' }]
  },
  {
    id: 2,
    name: 'MODULE_BETA',
    subsections: [{ id: 'b1', title: 'Target Profiles' }, { id: 'b2', title: 'Network Map' }]
  },
  {
    id: 3,
    name: 'MODULE_GAMMA',
    subsections: [{ id: 'g1', title: 'Encrypted Comms' }, { id: 'g2', title: 'Firewall Status' }, { id: 'g3', title: 'Data Fragments' }]
  },
  {
    id: 4,
    name: 'MODULE_DELTA',
    subsections: [{ id: 'd1', title: 'User Accounts' }]
  },
];
// --- END BACKEND PLACEHOLDER ---

const LeftPanel = () => {
  const [activeModule, setActiveModule] = useState(modulesData[0].id);

  const handleModuleClick = (moduleId) => {
    setActiveModule(activeModule === moduleId ? null : moduleId);
  };

  const selectedModule = modulesData.find(m => m.id === activeModule);

  return (
    // Use the new frame class for the outer container
    <div className="pixel-frame h-full">
        {/* Use the new content class for the inner div */}
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
                        <p key={sub.id} className="text-sm cursor-pointer hover:underline">{sub.title}</p>
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