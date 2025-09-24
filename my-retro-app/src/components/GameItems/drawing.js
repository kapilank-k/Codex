// src/components/Game/drawing.js

import { GAME_CONFIG, TILES } from './constants.js';

export const drawStars = (context, stars, time) => {
    context.fillStyle = '#0F110C';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    stars.forEach(star => {
        const opacity = (Math.sin(star.twinkleOffset + time * star.twinkleSpeed) + 1) / 2 * 0.8 + 0.2;
        context.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        context.fillRect(star.x, star.y, star.size, star.size);
    });
};

export const drawMap = (context, map) => {
    const TILE_SIZE = GAME_CONFIG.TILE_SIZE;
    const baseFloorColor = '#5D5488';
    const textureColor = '#403860';
    for (let y = 0; y < GAME_CONFIG.MAP_HEIGHT_TILES; y++) {
        for (let x = 0; x < GAME_CONFIG.MAP_WIDTH_TILES; x++) {
            if (map[y] && map[y][x] === TILES.FLOOR) {
                context.fillStyle = baseFloorColor;
                context.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                context.fillStyle = textureColor;
                for(let i = 0; i < 5; i++) {
                    const seed = (x + i * 2) * 19 + (y + i * 5) * 757;
                    const randX = Math.abs(Math.sin(seed * 1.2)) * (TILE_SIZE - 3);
                    const randY = Math.abs(Math.cos(seed * 2.5)) * (TILE_SIZE - 3);
                    context.fillRect(x * TILE_SIZE + randX, y * TILE_SIZE + randY, 3, 3);
                }
            }
        }
    }
    context.strokeStyle = '#F21170';
    context.lineWidth = 4;
    for (let y = 0; y < GAME_CONFIG.MAP_HEIGHT_TILES; y++) {
        for (let x = 0; x < GAME_CONFIG.MAP_WIDTH_TILES; x++) {
            if (map[y] && map[y][x] === TILES.FLOOR) {
                if (y > 0 && map[y - 1][x] === TILES.WALL) { context.beginPath(); context.moveTo(x * TILE_SIZE, y * TILE_SIZE); context.lineTo((x + 1) * TILE_SIZE, y * TILE_SIZE); context.stroke(); }
                if (y < GAME_CONFIG.MAP_HEIGHT_TILES - 1 && map[y + 1][x] === TILES.WALL) { context.beginPath(); context.moveTo(x * TILE_SIZE, (y + 1) * TILE_SIZE); context.lineTo((x + 1) * TILE_SIZE, (y + 1) * TILE_SIZE); context.stroke(); }
                if (x > 0 && map[y][x - 1] === TILES.WALL) { context.beginPath(); context.moveTo(x * TILE_SIZE, y * TILE_SIZE); context.lineTo(x * TILE_SIZE, (y + 1) * TILE_SIZE); context.stroke(); }
                if (x < GAME_CONFIG.MAP_WIDTH_TILES - 1 && map[y][x + 1] === TILES.WALL) { context.beginPath(); context.moveTo((x + 1) * TILE_SIZE, y * TILE_SIZE); context.lineTo((x + 1) * TILE_SIZE, (y + 1) * TILE_SIZE); context.stroke(); }
            }
        }
    }
};

const drawSprite = (context, entity, spriteData, frame) => {
    if (!frame) return;
    const pixelSize = Math.ceil(entity.size / spriteData.width);
    for (let y = 0; y < frame.length; y++) {
        for (let x = 0; x < frame[y].length; x++) {
            const colorIndex = frame[y][x];
            if (colorIndex > 0) {
                context.fillStyle = spriteData.colors[colorIndex];
                context.fillRect(entity.x + (x * pixelSize), entity.y + (y * pixelSize), pixelSize, pixelSize);
            }
        }
    }
};

export const drawPlayer = (context, player, playerSprite, gameState, gameTime) => {
    if (gameState === 'invincible' && gameTime % 10 < 5) return;
    const frame = playerSprite[player.dir][player.isMoving ? player.animFrame : 0];
    drawSprite(context, player, playerSprite, frame);
};

export const drawEnemies = (context, enemies, enemySprite) => {
    enemies.forEach(enemy => {
        const frame = enemySprite.frames[0];
        drawSprite(context, enemy, enemySprite, frame);
    });
};

export const drawAngel = (context, angel, angelSprite) => {
    const frame = angelSprite.frames[angel.animFrame];
    drawSprite(context, angel, angelSprite, frame);
};

export const drawUI = (context, lives) => {
    const padding = 20;
    const heartPixels = [ [0,1,1,0,1,1,0], [1,1,1,1,1,1,1], [1,1,1,1,1,1,1], [0,1,1,1,1,1,0], [0,0,1,1,1,0,0], [0,0,0,1,0,0,0] ];
    const pixelSize = 3;
    const heartWidth = heartPixels[0].length * pixelSize;
    for (let i = 0; i < lives; i++) {
        const startX = padding + i * (heartWidth + padding / 2);
        const startY = padding;
        for (let y = 0; y < heartPixels.length; y++) {
            for (let x = 0; x < heartPixels[y].length; x++) {
                if (heartPixels[y][x] === 1) {
                    context.fillStyle = '#ff1a1a';
                    context.fillRect(startX + x * pixelSize, startY + y * pixelSize, pixelSize, pixelSize);
                }
            }
        }
    }
};

export const drawGameOverScreen = (context) => {
    context.fillStyle = 'rgba(0, 0, 0, 0.8)';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    context.font = "48px 'Press Start 2P'";
    context.fillStyle = 'red';
    context.textAlign = 'center';
    context.fillText('GAME OVER', context.canvas.width / 2, context.canvas.height / 2 - 40);
    context.font = "20px 'Press Start 2P'";
    context.fillStyle = 'white';
    context.fillText('[ press any key to try again ]', context.canvas.width / 2, context.canvas.height / 2 + 20);
};