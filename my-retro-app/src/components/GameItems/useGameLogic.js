// src/components/Game/useGameLogic.js

import { useRef, useEffect } from 'react';
import { GAME_CONFIG, TILES } from './constants.js';
import { INITIAL_PLAYER_STATE, playerSprite } from './player.js';
import { generateMap } from './mapGenerator.js';
import { drawStars, drawMap, drawPlayer, drawEnemies, drawUI, drawGameOverScreen, drawAngel } from './drawing.js';
import { generateEnemies, enemySprite } from './enemies.js';
import { ANGEL_STATE, angelSprite } from './angel.js';

// The hook now accepts a third argument, a callback function `setControls`.
// This allows the hook to "give" its internal functions (like restartGame) to the parent component.
export const useGameLogic = (canvasRef, setGameMode, setControls) => {
    // Refs for all game entities and assets
    const playerRef = useRef(JSON.parse(JSON.stringify(INITIAL_PLAYER_STATE)));
    const keysPressedRef = useRef({});
    const mapRef = useRef([]);
    const starsRef = useRef([]);
    const enemiesRef = useRef([]);
    const angelRef = useRef(JSON.parse(JSON.stringify(ANGEL_STATE)));

    // Refs for managing game state and timers
    const gameTimeRef = useRef(0);
    const gameStateRef = useRef('playing'); // Internal states: 'playing', 'invincible', 'gameOver'
    const playerLivesRef = useRef(GAME_CONFIG.PLAYER_LIVES);
    const invincibilityTimerRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext('2d');
        if (!context) return;
        
        canvas.width = GAME_CONFIG.MAP_WIDTH_TILES * GAME_CONFIG.TILE_SIZE;
        canvas.height = GAME_CONFIG.MAP_HEIGHT_TILES * GAME_CONFIG.TILE_SIZE;
        context.imageSmoothingEnabled = false;
        
        // --- Game Initialization & Restart Logic ---
        const initGame = () => {
            const newMap = generateMap();
            mapRef.current = newMap.grid;
            
            if (newMap.playerStart) {
                playerRef.current.x = newMap.playerStart.x;
                playerRef.current.y = newMap.playerStart.y;
            }
            if (newMap.angelStart) {
                angelRef.current.x = newMap.angelStart.x;
                angelRef.current.y = newMap.angelStart.y;
            }
            enemiesRef.current = generateEnemies(mapRef.current, 5, newMap.finalRoom);
            
            const starCount = 200;
            const newStars = [];
            for(let i=0; i < starCount; i++) {
                newStars.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, size: Math.random() * 2 + 1, twinkleSpeed: Math.random() * 0.03, twinkleOffset: Math.random() * Math.PI * 2 });
            }
            starsRef.current = newStars;

            playerLivesRef.current = GAME_CONFIG.PLAYER_LIVES;
            gameStateRef.current = 'playing';
            invincibilityTimerRef.current = 0;
        };
        
        const restartGame = () => {
            initGame();
            setGameMode('game');
        };
        
        // This effect runs once to pass the control function up to the parent component.
        if (setControls) {
            setControls({ restartGame });
        }

        initGame();

        // --- Event Listeners ---
        const handleKeyDown = (e) => {
            if (gameStateRef.current === 'gameOver') {
                restartGame();
                return;
            }
            keysPressedRef.current[e.key.toLowerCase()] = true;
        };
        const handleKeyUp = (e) => { keysPressedRef.current[e.key.toLowerCase()] = false; };
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        // --- Collision and Update Logic ---
        const checkCollision = (x, y, size) => {
            const map = mapRef.current;
            const TILE_SIZE = GAME_CONFIG.TILE_SIZE;
            const left = Math.floor(x / TILE_SIZE);
            const right = Math.floor((x + size - 1) / TILE_SIZE);
            const top = Math.floor(y / TILE_SIZE);
            const bottom = Math.floor((y + size - 1) / TILE_SIZE);
            if (left < 0 || right >= GAME_CONFIG.MAP_WIDTH_TILES || top < 0 || bottom >= GAME_CONFIG.MAP_HEIGHT_TILES) return true;
            if (!map[top] || !map[bottom]) return true;
            if (map[top][left] === TILES.WALL || map[top][right] === TILES.WALL || map[bottom][left] === TILES.WALL || map[bottom][right] === TILES.WALL) return true;
            return false;
        };
        
        const updatePlayer = () => {
            const player = playerRef.current;
            const keys = keysPressedRef.current;
            let dx = 0, dy = 0;
            if (keys['w'] || keys['arrowup']) { dy -= player.speed; player.dir = 'up'; }
            if (keys['s'] || keys['arrowdown']) { dy += player.speed; player.dir = 'down'; }
            if (keys['a'] || keys['arrowleft']) { dx -= player.speed; player.dir = 'left'; }
            if (keys['d'] || keys['arrowright']) { dx += player.speed; player.dir = 'right'; }
            player.isMoving = (dx !== 0 || dy !== 0);
            if (player.isMoving) {
                player.animTimer++;
                if (player.animTimer > 8) {
                    player.animFrame = (player.animFrame + 1) % playerSprite[player.dir].length;
                    player.animTimer = 0;
                }
            } else { player.animFrame = 0; }
            if (dx !== 0 && !checkCollision(player.x + dx, player.y, player.size)) player.x += dx;
            if (dy !== 0 && !checkCollision(player.x, player.y + dy, player.size)) player.y += dy;
        };

        const updateEnemies = () => {
            enemiesRef.current.forEach(enemy => {
                enemy.moveTimer--;
                if (enemy.moveTimer <= 0) {
                    enemy.dir = ['up', 'down', 'left', 'right'][Math.floor(Math.random() * 4)];
                    enemy.moveTimer = Math.floor(Math.random() * 100) + 60;
                }
                let dx = 0, dy = 0;
                if (enemy.dir === 'up') dy = -enemy.speed; if (enemy.dir === 'down') dy = enemy.speed;
                if (enemy.dir === 'left') dx = -enemy.speed; if (enemy.dir === 'right') dx = enemy.speed;
                if (!checkCollision(enemy.x + dx, enemy.y + dy, enemy.size)) {
                    enemy.x += dx; enemy.y += dy;
                } else { enemy.moveTimer = 0; }
            });
        };
        
        const updateAngel = () => {
            const angel = angelRef.current;
            angel.animTimer++;
            if (angel.animTimer > 25) {
                angel.animFrame = (angel.animFrame + 1) % angelSprite.frames.length;
                angel.animTimer = 0;
            }
        };

        const checkPlayerEnemyCollisions = () => {
            if (gameStateRef.current !== 'playing') return;
            const player = playerRef.current;
            enemiesRef.current.forEach(enemy => {
                const dx = player.x - enemy.x;
                const dy = player.y - enemy.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < (player.size + enemy.size) / 2) {
                    playerLivesRef.current--;
                    gameStateRef.current = 'invincible';
                    invincibilityTimerRef.current = GAME_CONFIG.INVINCIBILITY_DURATION;
                    if (playerLivesRef.current <= 0) gameStateRef.current = 'gameOver';
                }
            });
        };

        const checkPlayerAngelCollision = () => {
            if (gameStateRef.current !== 'playing' && gameStateRef.current !== 'invincible') return;
            const player = playerRef.current;
            const angel = angelRef.current;
            const dx = (player.x + player.size / 2) - (angel.x + angel.size / 2);
            const dy = (player.y + player.size / 2) - (angel.y + angel.size / 2);
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < (player.size / 2 + angel.size / 2 - 10)) {
                setGameMode('chat');
            }
        };
        
        const updateGameState = () => {
            if (gameStateRef.current === 'invincible') {
                invincibilityTimerRef.current--;
                if (invincibilityTimerRef.current <= 0) gameStateRef.current = 'playing';
            }
        };

        // --- Main Game Loop ---
        let animationFrameId;
        const gameLoop = () => {
            gameTimeRef.current++;
            if (gameStateRef.current !== 'gameOver') {
                updatePlayer();
                updateEnemies();
                updateAngel();
                checkPlayerEnemyCollisions();
                checkPlayerAngelCollision();
                updateGameState();
            }

            context.clearRect(0, 0, canvas.width, canvas.height);
            drawStars(context, starsRef.current, gameTimeRef.current);
            drawMap(context, mapRef.current);
            drawAngel(context, angelRef.current, angelSprite);
            drawEnemies(context, enemiesRef.current, enemySprite);
            drawPlayer(context, playerRef.current, playerSprite, gameStateRef.current, gameTimeRef.current);
            drawUI(context, playerLivesRef.current);
            if (gameStateRef.current === 'gameOver') drawGameOverScreen(context);
            
            animationFrameId = requestAnimationFrame(gameLoop);
        };
        gameLoop();

        // --- Cleanup ---
        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [canvasRef, setGameMode, setControls]);
};