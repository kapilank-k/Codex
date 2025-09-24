// src/components/Game/Game.jsx

import React, { useRef, useState } from 'react';
import { useGameLogic } from './useGameLogic.js';
import RightPanel from '../UI/RightPanel.jsx'; // <-- Import new UI
import PixelArtBackground from '../UI/PixelArtBackground.jsx'; // <-- Import new UI

const Game = () => {
    const canvasRef = useRef(null);
    // NEW: This state controls whether we see the game or the chat panel
    const [gameMode, setGameMode] = useState('game'); // 'game' or 'chat'

    // Pass the setter function to the game logic hook
    useGameLogic(canvasRef, setGameMode);

    const handleChatComplete = () => {
        // When chat is done, we simply switch back to game mode.
        // A full level restart will be triggered by the 'gameOver' logic or future level clear logic.
        // For now, this just returns to the game. To restart, you'd trigger a Game Over.
        // Let's refine this to restart the level completely.
        window.location.reload(); // The simplest way to trigger a full restart and re-init
    };

    if (gameMode === 'chat') {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100vh',
            }}>
                <PixelArtBackground />
                <RightPanel onChatComplete={handleChatComplete} />
            </div>
        );
    }

    // Otherwise, render the game
    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            width: '100%', 
            height: '100vh', 
            backgroundColor: '#0F110C',
            padding: '16px'
        }}>
            <canvas 
                ref={canvasRef} 
                style={{ 
                    border: '2px solid #fff', 
                    imageRendering: 'pixelated',
                    maxWidth: '100%',
                    maxHeight: '100vh',
                    objectFit: 'contain'
                }} 
            />
        </div>
    );
};

export default Game;