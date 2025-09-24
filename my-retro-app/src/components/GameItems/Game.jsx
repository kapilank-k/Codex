// src/components/Game/Game.jsx

import React, { useRef, useState, useCallback } from 'react'; // 1. Import useCallback
import { useGameLogic } from './useGameLogic.js';
import RightPanel from '../UI/RightPanel.jsx';
import PixelArtBackground from '../UI/PixelArtBackground.jsx';

const Game = ({ onExitGame }) => { // 2. Receive the onExitGame prop from App.jsx
    const canvasRef = useRef(null);
    const [gameMode, setGameMode] = useState('game');

    // 3. Create a ref to hold the restart function from the game logic
    const gameLogicControls = useRef({});

    // 4. Pass a function to the hook to receive the controls
    useGameLogic(canvasRef, setGameMode, (controls) => {
        gameLogicControls.current = controls;
    });

    // 5. Define the chat completion handler
    const handleChatComplete = useCallback(() => {
        // Call the restart function from our game logic to generate a new level
        if (gameLogicControls.current.restartGame) {
            gameLogicControls.current.restartGame();
        }
        // Switch the view back to the game
        setGameMode('game');
    }, []); // Empty dependency array means this function is created only once

    // --- RENDER LOGIC ---

    if (gameMode === 'chat') {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
                <PixelArtBackground />
                <RightPanel onChatComplete={handleChatComplete} />
            </div>
        );
    }

    // Render the game with an exit button
    return (
        <div style={{ position: 'relative', width: '100%', height: '100vh', backgroundColor: '#0F110C' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', padding: '16px' }}>
                <canvas 
                    ref={canvasRef} 
                    style={{ border: '2px solid #fff', imageRendering: 'pixelated', maxWidth: '100%', maxHeight: '100vh', objectFit: 'contain' }} 
                />
            </div>
            {/* 6. Add an "Exit Game" button */}
            <button
                onClick={onExitGame}
                className="absolute top-5 right-5 font-pixel px-4 py-2 bg-red-600 text-white border-2 border-white hover:bg-red-800 transition-colors"
            >
                Exit Game
            </button>
        </div>
    );
};

export default Game;