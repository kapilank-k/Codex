// src/components/Game/enemies.js

import { GAME_CONFIG, TILES } from './constants.js';

// --- Alien Sprite Definition (Pixel Art) ---
export const enemySprite = {
    width: 16,
    height: 16,
    // Colors: 0=transparent, 1=hacker-green, 2=darker-green
    colors: ['transparent', '#00ff00', '#00aa00'], 
    frames: [
        [ // Single frame for the enemy
            [0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0],
            [0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0],
            [0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
            [0,0,1,2,1,1,2,1,1,2,1,1,0,0,0,0],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
            [0,0,1,1,0,1,1,1,1,0,1,1,0,0,0,0],
            [0,0,1,1,0,1,1,1,1,0,1,1,0,0,0,0],
        ],
    ]
};

// --- Function to Generate Enemies ---
// Now accepts a 'finalRoom' object to avoid spawning enemies there.
export const generateEnemies = (map, count, finalRoom) => {
    const newEnemies = [];
    const floorTiles = [];

    // Find all possible floor locations to spawn an enemy
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] === TILES.FLOOR) {
                // Check if the current tile is inside the final room's boundaries
                const inFinalRoom = finalRoom && 
                                  (x >= finalRoom.x && x < finalRoom.x + finalRoom.width && 
                                   y >= finalRoom.y && y < finalRoom.y + finalRoom.height);

                // Only add the tile if it's NOT in the final room
                if (!inFinalRoom) {
                    floorTiles.push({ x, y });
                }
            }
        }
    }

    // Create 'count' number of enemies at random, valid floor locations
    for (let i = 0; i < count; i++) {
        if (floorTiles.length === 0) break; // No more valid spots to spawn

        const randomIndex = Math.floor(Math.random() * floorTiles.length);
        const tile = floorTiles.splice(randomIndex, 1)[0]; // Prevents spawning multiple enemies on the same tile

        newEnemies.push({
            x: tile.x * GAME_CONFIG.TILE_SIZE + (GAME_CONFIG.TILE_SIZE / 4),
            y: tile.y * GAME_CONFIG.TILE_SIZE + (GAME_CONFIG.TILE_SIZE / 4),
            size: 20,
            speed: 1,
            dir: ['up', 'down', 'left', 'right'][Math.floor(Math.random() * 4)],
            moveTimer: Math.floor(Math.random() * 120), // Random initial timer to stagger movement
        });
    }

    return newEnemies;
};