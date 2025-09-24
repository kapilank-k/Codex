// src/components/Game/mapGenerator.js

import { GAME_CONFIG, TILES } from './constants.js';
import { INITIAL_PLAYER_STATE } from './player.js';
import { ANGEL_STATE } from './angel.js';

export const generateMap = () => {
    let grid = Array(GAME_CONFIG.MAP_HEIGHT_TILES).fill().map(() => Array(GAME_CONFIG.MAP_WIDTH_TILES).fill(TILES.WALL));
    const rooms = [];
    let playerStart = null;
    let angelStart = null;
    let finalRoom = null;

    const minRooms = 8, maxRooms = 14, minRoomSize = 3, maxRoomSize = 6;
    const roomCount = Math.floor(Math.random() * (maxRooms - minRooms + 1)) + minRooms;
    
    for (let i = 0; i < roomCount; i++) {
        let room = {};
        room.width = Math.floor(Math.random() * (maxRoomSize - minRoomSize + 1)) + minRoomSize;
        room.height = Math.floor(Math.random() * (maxRoomSize - minRoomSize + 1)) + minRoomSize;
        room.x = Math.floor(Math.random() * (GAME_CONFIG.MAP_WIDTH_TILES - room.width - 2)) + 1;
        room.y = Math.floor(Math.random() * (GAME_CONFIG.MAP_HEIGHT_TILES - room.height - 5)) + 3;
        
        let overlaps = rooms.some(r => room.x < r.x + r.width && room.x + room.width > r.x && room.y < r.y + r.height && room.y + room.height > r.y);
        if (!overlaps) rooms.push(room);
    }

    if (rooms.length > 0) {
        // --- Identify Start and Final Rooms ---
        const startRoom = rooms[0];
        let maxDist = 0;
        
        const startCenter = { x: startRoom.x + startRoom.width / 2, y: startRoom.y + startRoom.height / 2 };

        for (let i = 1; i < rooms.length; i++) {
            const roomCenter = { x: rooms[i].x + rooms[i].width / 2, y: rooms[i].y + rooms[i].height / 2 };
            const dist = Math.sqrt(Math.pow(startCenter.x - roomCenter.x, 2) + Math.pow(startCenter.y - roomCenter.y, 2));
            if (dist > maxDist) {
                maxDist = dist;
                finalRoom = rooms[i];
            }
        }

        // If for some reason no other room was found, pick the last one.
        if (!finalRoom && rooms.length > 1) {
            finalRoom = rooms[rooms.length - 1];
        }

        // Make final room slightly bigger
        if (finalRoom) {
            finalRoom.x = Math.max(1, finalRoom.x - 1);
            finalRoom.y = Math.max(1, finalRoom.y - 1);
            finalRoom.width = Math.min(GAME_CONFIG.MAP_WIDTH_TILES - 2 - finalRoom.x, finalRoom.width + 2);
            finalRoom.height = Math.min(GAME_CONFIG.MAP_HEIGHT_TILES - 2 - finalRoom.y, finalRoom.height + 2);
        }
        
        // Carve rooms into grid
        rooms.forEach(room => {
            for (let y = room.y; y < room.y + room.height; y++) {
                for (let x = room.x; x < room.x + room.width; x++) {
                    if (grid[y] && grid[y][x] !== undefined) grid[y][x] = TILES.FLOOR;
                }
            }
        });

        // Carve corridors
        for(let i = 1; i < rooms.length; i++) {
            const prevCenter = { x: Math.floor(rooms[i-1].x + rooms[i-1].width / 2), y: Math.floor(rooms[i-1].y + rooms[i-1].height / 2) };
            const currentCenter = { x: Math.floor(rooms[i].x + rooms[i].width / 2), y: Math.floor(rooms[i].y + rooms[i].height / 2) };
            for(let x = Math.min(prevCenter.x, currentCenter.x); x <= Math.max(prevCenter.x, currentCenter.x); x++) {
                if (grid[prevCenter.y]) grid[prevCenter.y][x] = TILES.FLOOR;
            }
            for(let y = Math.min(prevCenter.y, currentCenter.y); y <= Math.max(prevCenter.y, currentCenter.y); y++) {
                if (grid[y]) grid[y][currentCenter.x] = TILES.FLOOR;
            }
        }

        // Set player start position
        playerStart = {
            x: startCenter.x * GAME_CONFIG.TILE_SIZE - INITIAL_PLAYER_STATE.size / 2,
            y: startCenter.y * GAME_CONFIG.TILE_SIZE - INITIAL_PLAYER_STATE.size / 2
        };

        // Set angel start position
        if (finalRoom) {
            const angelCenter = { x: finalRoom.x + finalRoom.width / 2, y: finalRoom.y + finalRoom.height / 2 };
            angelStart = {
                x: angelCenter.x * GAME_CONFIG.TILE_SIZE - ANGEL_STATE.size / 2,
                y: angelCenter.y * GAME_CONFIG.TILE_SIZE - ANGEL_STATE.size / 2,
            };
        }
    }

    return { grid, playerStart, angelStart, finalRoom };
};