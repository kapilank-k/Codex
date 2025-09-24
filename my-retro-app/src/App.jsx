import React from 'react';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';

function App() {
  return (
    <main className="bg-[#0F110C] min-h-screen p-8 font-mono">
      <div className="container mx-auto h-[calc(100vh-4rem)]"> {/* Full height minus padding */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
          {/* Left Panel */}
          <div>
            <LeftPanel />
          </div>
          {/* Right Panel */}
          <div>
            <RightPanel />
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;