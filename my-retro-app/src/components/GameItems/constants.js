// src/components/Game/constants.js

export const GAME_CONFIG = {
    TILE_SIZE: 40,
    MAP_WIDTH_TILES: 30, 
    MAP_HEIGHT_TILES: 22,
    PLAYER_LIVES: 2,           // <-- ADDED
    INVINCIBILITY_DURATION: 120, // <-- ADDED (120 frames = ~2 seconds)
};

export const TILES = {
    WALL: 0,
    FLOOR: 1,
};