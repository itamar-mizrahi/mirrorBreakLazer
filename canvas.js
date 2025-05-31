import { Planet } from './planet.js';
import { Obliquelineleft } from './obliquelineleft.js';
import { ObliquelineRight } from './obliquelineRight.js';
import { Spaceship } from './spaceship.js';
import { Lazer } from './lazer.js';
import { Levels } from './levels.js';

window.onload = function () {
    const x = 60, y = 60;
    let indexLevel = 0;
    let lazerY = 0, lazerX = 0;
    // NEW: Game state variables
    let score = 0;
    let lives = 3;
    let timeElapsed = 0;
    let gameStartTime = 0;
    let bestTimes = JSON.parse(localStorage.getItem('bestTimes')) || {};
    
    // NEW: Game modes and additional features
    let gameMode = 'normal'; // normal, timeAttack, infinite
    let movingObstacles = [];
    let powerUps = [];
    let streak = 0;
    let maxStreak = parseInt(localStorage.getItem('maxStreak')) || 0;
    
    let audioContext = null;
    let soundEnabled = localStorage.getItem('soundEnabled') !== 'false';
    
    // NEW: Enhanced Sound effects system with Web Audio API
    const sounds = {
        laser: null,
        hit: null,
        win: null,
        lose: null,
        mirror: null
    };
    
    // Initialize sound effects with better error handling
    function initSounds() {
        try {
            // Try to create AudioContext for better sound control
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Web Audio API not supported, using HTML5 Audio');
        }
        
        const soundConfig = {
            laser: 'sounds/laser.mp3',
            hit: 'sounds/hit.mp3', 
            win: 'sounds/win.mp3',
            lose: 'sounds/lose.mp3',
            mirror: 'sounds/mirror.mp3'
        };
        
        Object.keys(soundConfig).forEach(key => {
            sounds[key] = new Audio();
            sounds[key].volume = 0.3;
            sounds[key].preload = 'auto';
            
            // Graceful fallback for missing files
            sounds[key].onerror = () => {
                sounds[key] = { 
                    play: () => {
                        // Create a simple beep sound using Web Audio API
                        if (audioContext && soundEnabled) {
                            playBeep(key);
                        }
                        return Promise.resolve();
                    }
                };
            };
            
            // Only load if file exists (try loading)
            sounds[key].src = soundConfig[key];
        });
        
        console.log('Enhanced sound system initialized');
    }
    
    // Create simple beep sounds when audio files are missing
    function playBeep(type) {
        if (!audioContext || !soundEnabled) return;
        
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Different frequencies for different sound types
        const frequencies = {
            laser: 220,
            hit: 150,
            win: 440,
            lose: 110,
            mirror: 330
        };
        
        oscillator.frequency.setValueAtTime(frequencies[type] || 220, audioContext.currentTime);
        oscillator.type = 'square';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
    }
    
    // Toggle sound on/off
    function toggleSound() {
        soundEnabled = !soundEnabled;
        document.getElementById('soundToggle').textContent = soundEnabled ? '🔊 Sound On' : '🔇 Sound Off';
        localStorage.setItem('soundEnabled', soundEnabled);
    }
    
    let lazerObject = new Lazer();
    let spaceshipObject = new Spaceship();
    let plantObject = new Planet();
    let obliquelineleftObject = new Obliquelineleft();
    let obliquelineRightObject = new ObliquelineRight();
    let levelsObject = new Levels();
    let canvas = document.getElementById('mirrorBreakLazer');
    let ctx = canvas.getContext('2d');
    let stopIDStart = 0;
    let objectsPosition = [];
    let speedY = 0, speedX = 0;
    let speed = 5;
    let pressed = 0;
    let mirrorsPosLevel1 = [], mirrorsPosLevel2 = [], mirrorsPosLevel3 = [], mirrorsPosLevel4 = [];
    let planetsPosLevel1 = [], planetsPosLevel2 = [], planetsPosLevel3 = [], planetsPosLevel4 = [];
    let lazerPosLevel1 = [], lazerPosLevel2 = [], lazerPosLevel3 = [], lazerPosLevel4 = [];
    let spaceshipPosLevel1 = [], spaceshipPosLevel2 = [], spaceshipPosLevel3 = [], spaceshipPosLevel4 = [];
    let sizeOfFont=60;
    let mousePos=0;
    let rect=0;
    //---------------------------------------------------------------------
    function drawLevel(level) {
         mirrorsPosLevel1 = [], mirrorsPosLevel2 = [], mirrorsPosLevel3 = [], mirrorsPosLevel4 = [];
         planetsPosLevel1 = [], planetsPosLevel2 = [], planetsPosLevel3 = [], planetsPosLevel4 = [];
         lazerPosLevel1 = [], lazerPosLevel2 = [], lazerPosLevel3 = [], lazerPosLevel4 = [];
         spaceshipPosLevel1 = [], spaceshipPosLevel2 = [], spaceshipPosLevel3 = [], spaceshipPosLevel4 = [];

        for (let i = 0; i < level.length; i++) {
            objectsPosition[i] = []
            for (let j = 0; j < level[i].length; j++) {
                // ...existing code for drawing objects...
                if (level[i][j] === 1) {
                    spaceshipObject.create(ctx, j * x, i * y);
                    objectsPosition[i][j] = {
                        posX: j * x,
                        posY: i * y,
                        kind: 'spaceship'
                    }
                    // Store spaceship positions for levels 1-4 only
                    const spaceshipArrays = [spaceshipPosLevel1, spaceshipPosLevel2, spaceshipPosLevel3, spaceshipPosLevel4];
                    if (indexLevel < 4 && spaceshipArrays[indexLevel]) {
                        spaceshipArrays[indexLevel].push(objectsPosition[i][j]);
                    }
                } else if (level[i][j] === 2) {
                    lazerObject.create(ctx, j * x, i * y, speed * 5);
                    lazerX = j * x;
                    lazerY = i * y;
                    speedX = 0;
                    speedY = 0;
                    objectsPosition[i][j] = {
                        posX: j * x,
                        posY: i * y,
                        kind: 'lazer'
                    }
                    // Store laser positions for levels 1-4 only
                    const lazerArrays = [lazerPosLevel1, lazerPosLevel2, lazerPosLevel3, lazerPosLevel4];
                    if (indexLevel < 4 && lazerArrays[indexLevel]) {
                        lazerArrays[indexLevel].push(objectsPosition[i][j]);
                    }
                }
                // ...rest of existing code...
                else if (level[i][j] === 3) {
                    plantObject.create(ctx, j * x, i * y);
                    objectsPosition[i][j] = {
                        posX: j * x,
                        posY: i * y,
                        kind: 'planet'
                    }
                    // Store planet positions for levels 1-4 only
                    const planetArrays = [planetsPosLevel1, planetsPosLevel2, planetsPosLevel3, planetsPosLevel4];
                    if (indexLevel < 4 && planetArrays[indexLevel]) {
                        planetArrays[indexLevel].push(objectsPosition[i][j]);
                    }

                }
                else if (level[i][j] === 4) {
                    obliquelineRightObject.create(ctx, j * x, i * y);
                    obliquelineleftObject.create(ctx, j * x, i * y);
                    objectsPosition[i][j] = {
                        posX: j * x,
                        posY: i * y,
                        kind: 'obliquelineleft'
                    }
                    // Store mirror positions for levels 1-4 only
                    const mirrorArrays = [mirrorsPosLevel1, mirrorsPosLevel2, mirrorsPosLevel3, mirrorsPosLevel4];
                    if (indexLevel < 4 && mirrorArrays[indexLevel]) {
                        mirrorArrays[indexLevel].push(objectsPosition[i][j]);
                    }
                }
                else if (level[i][j] === 5) {
                    obliquelineleftObject.create(ctx, j * x, i * y);
                    obliquelineRightObject.create(ctx, j * x, i * y);
                    objectsPosition[i][j] = {
                        posX: j * x,
                        posY: i * y,
                        kind: 'obliquelineRight'
                    }
                    // Store mirror positions for levels 1-4 only
                    const mirrorArrays = [mirrorsPosLevel1, mirrorsPosLevel2, mirrorsPosLevel3, mirrorsPosLevel4];
                    if (indexLevel < 4 && mirrorArrays[indexLevel]) {
                        mirrorArrays[indexLevel].push(objectsPosition[i][j]);
                    }
                }
            }
        }
        
        // Initialize new features for current level
        initMovingObstacles(indexLevel);
        powerUps = []; // Reset power-ups for new level
        
        // Show hint for first level
        if (indexLevel === 0 && !localStorage.getItem('tutorialCompleted')) {
            showTutorialHint();
        }
        
        updateUI(); // Update UI when level is drawn
    }
    
    function showTutorialHint() {
        setTimeout(() => {
            ctx.save();
            ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.font = "24px Comic Sans MS";
            ctx.fillStyle = "#ffff00";
            ctx.textAlign = "center";
            ctx.fillText("💡 Tutorial Hint", canvas.width / 2, 100);
            
            ctx.font = "18px Comic Sans MS";
            ctx.fillStyle = "white";
            ctx.fillText("Click on mirrors to rotate them", canvas.width / 2, 140);
            ctx.fillText("Guide the laser to hit the spaceship!", canvas.width / 2, 170);
            ctx.fillText("Avoid hitting planets (obstacles)", canvas.width / 2, 200);
            ctx.fillText("Press any key to start", canvas.width / 2, 240);
            
            ctx.restore();
            
            // Auto-hide after 5 seconds or on any click
            let hideTimeout = setTimeout(() => {
                clearCanvas();
                drawLevel(Object.values(levelsObject)[indexLevel]);
                localStorage.setItem('tutorialCompleted', 'true');
            }, 5000);
            
            const hideHint = () => {
                clearTimeout(hideTimeout);
                clearCanvas();
                drawLevel(Object.values(levelsObject)[indexLevel]);
                localStorage.setItem('tutorialCompleted', 'true');
                document.removeEventListener('keydown', hideHint);
                canvas.removeEventListener('click', hideHint);
            };
            
            document.addEventListener('keydown', hideHint, { once: true });
            canvas.addEventListener('click', hideHint, { once: true });
        }, 500);
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // NEW: Score and UI update functions
    function updateScore(points) {
        score += points;
        updateUI();
    }
    
    function updateUI() {
        const scoreElement = document.getElementById('score');
        const livesElement = document.getElementById('lives');
        const timeElement = document.getElementById('time');
        const levelElement = document.getElementById('level');
        const streakElement = document.getElementById('streak');
        
        if (scoreElement) scoreElement.textContent = score;
        if (livesElement) livesElement.textContent = lives;
        if (levelElement) levelElement.textContent = indexLevel + 1;
        if (streakElement) {
            streakElement.textContent = streak;
            // Highlight streak if it's high
            if (streak >= 3) {
                streakElement.style.color = '#ffd700';
                streakElement.style.textShadow = '0 0 10px #ffd700';
            } else {
                streakElement.style.color = '#00ff88';
                streakElement.style.textShadow = 'none';
            }
        }
        if (timeElement && gameStartTime) {
            timeElapsed = Math.floor((Date.now() - gameStartTime) / 1000);
            timeElement.textContent = timeElapsed + 's';
        }
    }
    
    // NEW: Enhanced Particle system for visual effects
    let particles = [];
    
    function createParticles(x, y, color, count = 10, type = 'default') {
        for (let i = 0; i < count; i++) {
            const particle = {
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                life: 30,
                maxLife: 30,
                color: color,
                type: type,
                size: Math.random() * 4 + 2
            };
            
            // Special effects for different types
            if (type === 'explosion') {
                particle.vx *= 2;
                particle.vy *= 2;
                particle.life = 60;
                particle.maxLife = 60;
            } else if (type === 'sparkle') {
                particle.vx *= 0.5;
                particle.vy *= 0.5;
                particle.life = 45;
                particle.maxLife = 45;
            }
            
            particles.push(particle);
        }
    }
    
    function updateParticles() {
        if (particles.length === 0) return; // Skip if no particles
        
        particles = particles.filter(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life--;
            particle.vx *= 0.98; // Add slight drag
            particle.vy *= 0.98;
            
            const alpha = particle.life / particle.maxLife;
            if (alpha > 0) {
                ctx.save();
                ctx.globalAlpha = alpha;
                ctx.fillStyle = particle.color;
                
                // Different rendering based on type
                if (particle.type === 'sparkle') {
                    // Draw sparkly star shape
                    ctx.fillRect(Math.floor(particle.x), Math.floor(particle.y), particle.size, 1);
                    ctx.fillRect(Math.floor(particle.x), Math.floor(particle.y), 1, particle.size);
                } else if (particle.type === 'explosion') {
                    // Draw larger, brighter particles
                    ctx.shadowColor = particle.color;
                    ctx.shadowBlur = 5;
                    ctx.fillRect(Math.floor(particle.x), Math.floor(particle.y), particle.size, particle.size);
                } else {
                    // Default particle
                    ctx.fillRect(Math.floor(particle.x), Math.floor(particle.y), 3, 3);
                }
                
                ctx.restore();
                return true;
            }
            return false;
        });
    }

    // -----------functions-to-buttons:---------------------------------------------------------------
    function start() {
        // Start timer if not already started
        if (!gameStartTime) {
            gameStartTime = Date.now();
        }
        
        let currentSpaceships, currentLazers, currentPlanets, currentMirrors;
        
        const levelData = [
            { spaceships: spaceshipPosLevel1, lazers: lazerPosLevel1, planets: planetsPosLevel1, mirrors: mirrorsPosLevel1 },
            { spaceships: spaceshipPosLevel2, lazers: lazerPosLevel2, planets: planetsPosLevel2, mirrors: mirrorsPosLevel2 },
            { spaceships: spaceshipPosLevel3, lazers: lazerPosLevel3, planets: planetsPosLevel3, mirrors: mirrorsPosLevel3 },
            { spaceships: spaceshipPosLevel4, lazers: lazerPosLevel4, planets: planetsPosLevel4, mirrors: mirrorsPosLevel4 }
        ];
        
        if (levelData[indexLevel]) {
            currentSpaceships = levelData[indexLevel].spaceships;
            currentLazers = levelData[indexLevel].lazers;
            currentPlanets = levelData[indexLevel].planets;
            currentMirrors = levelData[indexLevel].mirrors;
        }

        // Update particles, moving obstacles, and power-ups
        updateParticles();
        
        // Update moving obstacles (if any collide, return early)
        if (updateMovingObstacles()) {
            return;
        }
        
        // Update power-ups
        updatePowerUps();
        
        // Occasionally spawn power-ups (only in levels 3+)
        if (indexLevel >= 2) {
            spawnPowerUp();
        }
        
        updateUI();

        // Check if laser hits any spaceship (target)
        for (let i = 0; i < currentSpaceships.length; i++) {
            if (lazerX == currentSpaceships[i].posX && lazerY == currentSpaceships[i].posY) {
                createParticles(lazerX + 30, lazerY + 30, '#00ff00', 15, 'explosion');
                createParticles(lazerX + 30, lazerY + 30, '#ffff00', 10, 'sparkle');
                if (soundEnabled) sounds.win.play().catch(() => playBeep('win'));
                streak++;
                updateScore(100 + (60 - timeElapsed) + (streak * 10)); // Bonus for speed + streak
                youWon();
                return;
            }
        }

        // Set initial laser direction based on level (levels 1-4 only)
        if (currentLazers && currentLazers[0]) {
            if (lazerY == currentLazers[0].posY && lazerX == currentLazers[0].posX) {
                if (indexLevel == 0) {
                    speedX = 0;
                    speedY = speed;
                } else if (indexLevel == 1) {
                    speedY = 0;
                    speedX = -speed;
                } else if (indexLevel == 2) {
                    speedY = 0;
                    speedX = speed;
                } else if (indexLevel == 3) {
                    speedY = speed;
                    speedX = 0;
                }
            }
        }

        // React to mirrors
        mirrorReact(currentMirrors);
        
        // Check collision with planets
        for (let i = 0; i < currentPlanets.length; i++) {
            if (lazerX == currentPlanets[i].posX && lazerY == currentPlanets[i].posY) {
                createParticles(lazerX + 30, lazerY + 30, '#ff0000', 12);
                if (soundEnabled) sounds.lose.play().catch(() => playBeep('lose'));
                
                // Save max streak before resetting
                if (streak > maxStreak) {
                    maxStreak = streak;
                    localStorage.setItem('maxStreak', maxStreak);
                }
                streak = 0; // Reset streak on hit
                lives--;
                updateUI();
                if (lives <= 0) {
                    gameOver();
                } else {
                    tryAgain();
                }
                return;
            }
        }
        
        if (lazerX < 0 || lazerY < 0 || lazerX > canvas.width || lazerY > canvas.height) {
            lives--;
            updateUI();
            if (lives <= 0) {
                gameOver();
            } else {
                tryAgain();
            }
            return;
        }
        lazerY += speedY;
        lazerX += speedX;
        
        // Add subtle laser trail effect
        if (Math.random() < 0.3) {
            createParticles(lazerX + 30, lazerY + 30, '#ff6b6b', 1, 'default');
        }
        
        lazerObject.create(ctx, lazerX, lazerY, speed * 2);
        stopIDStart = requestAnimationFrame(start);
    }

    function stop() {
        cancelAnimationFrame(stopIDStart);
        pressed = 0;
        showPauseScreen();
    }
    
    function showPauseScreen() {
        ctx.save();
        ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.font = "48px Comic Sans MS";
        ctx.fillStyle = "#ffff00";
        ctx.textAlign = "center";
        ctx.fillText("⏸️ PAUSED", canvas.width / 2, canvas.height / 2 - 80);
        
        ctx.font = "20px Comic Sans MS";
        ctx.fillStyle = "white";
        ctx.fillText(`Level: ${indexLevel + 1} | Score: ${score} | Lives: ${lives}`, canvas.width / 2, canvas.height / 2 - 20);
        
        if (timeElapsed > 0) {
            ctx.fillText(`Time: ${timeElapsed}s`, canvas.width / 2, canvas.height / 2 + 10);
        }
        
        ctx.fillStyle = "#00ff88";
        ctx.fillText("Press Start to continue", canvas.width / 2, canvas.height / 2 + 50);
        
        ctx.fillStyle = "#ccc";
        ctx.font = "16px Comic Sans MS";
        ctx.fillText("Keyboard: Space=Start/Pause | R=Reset | N=Next | P=Previous", canvas.width / 2, canvas.height / 2 + 90);
        
        ctx.restore();
    }

    function nextLevel() {
        // Check if we've completed all available levels (levels 1-4)
        if (indexLevel >= 3) { // indexLevel 3 = level 4 (0-based)
            // Show game completion
            showGameComplete();
            return;
        }
        
        if (Object.values(levelsObject)[indexLevel + 1]) {
            // Save best time for completed level
            if (timeElapsed && (!bestTimes[indexLevel] || timeElapsed < bestTimes[indexLevel])) {
                bestTimes[indexLevel] = timeElapsed;
                localStorage.setItem('bestTimes', JSON.stringify(bestTimes));
            }
            
            // Show level transition animation
            showLevelTransition(indexLevel + 1, indexLevel + 2);
            
            indexLevel++;
            gameStartTime = 0; // Reset timer for new level
            
            cancelAnimationFrame(stopIDStart);
            clearCanvas();
            
            // Delay drawing new level to show transition
            setTimeout(() => {
                drawLevel(Object.values(levelsObject)[indexLevel]);
            }, 1000);
        } else {
            // No more levels available
            showGameComplete();
        }
        
        pressed = 0;
    }
    
    function showLevelTransition(fromLevel, toLevel) {
        clearCanvas();
        
        // Create celebration particles
        for (let i = 0; i < 50; i++) {
            createParticles(
                Math.random() * canvas.width,
                Math.random() * canvas.height,
                `hsl(${Math.random() * 360}, 70%, 60%)`,
                1,
                'sparkle'
            );
        }
        
        ctx.save();
        ctx.font = "36px Comic Sans MS";
        ctx.fillStyle = "#00ff88";
        ctx.textAlign = "center";
        ctx.fillText(`Level ${fromLevel} Complete!`, canvas.width / 2, canvas.height / 2 - 40);
        
        ctx.font = "24px Comic Sans MS";
        ctx.fillStyle = "#ffff00";
        ctx.fillText(`Moving to Level ${toLevel}...`, canvas.width / 2, canvas.height / 2 + 20);
        
        ctx.fillStyle = "#ccc";
        ctx.font = "18px Comic Sans MS";
        ctx.fillText(`Score: ${score} | Streak: ${streak}`, canvas.width / 2, canvas.height / 2 + 60);
        ctx.restore();
    }

    function PreviousLevel() {
        if (Object.values(levelsObject)[indexLevel - 1]) {
            indexLevel--;
        }
        cancelAnimationFrame(stopIDStart);
        clearCanvas();
        drawLevel(Object.values(levelsObject)[indexLevel]);
        pressed = 0;
    }

    function resetLevel() {
        cancelAnimationFrame(stopIDStart);
        clearCanvas();
        drawLevel(Object.values(levelsObject)[indexLevel]);
        pressed = 0;
        gameStartTime = 0; // Reset timer
        lives = 3; // Reset lives
        updateUI();
    }

    // NEW: Game Over function
    function gameOver() {
        clearCanvas();
        ctx.font = `${sizeOfFont}px Comic Sans MS`;
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 2 - 50);
        ctx.font = "24px Comic Sans MS";
        ctx.fillText(`Final Score: ${score}`, canvas.width / 2, canvas.height / 2 + 20);
        ctx.fillText("Press Reset to try again", canvas.width / 2, canvas.height / 2 + 50);
    }

    canvas.addEventListener("mousedown", changeMirror, false);
    document.getElementById("start").onclick = function () { if (pressed == 0) { pressed = 1; start() } };
    document.getElementById("pause").onclick = function () { stop() };
    document.getElementById("next").onclick = function () { nextLevel() };
    document.getElementById("previous").onclick = function () { PreviousLevel() };
    document.getElementById("reset").onclick = function () { resetLevel() };
    document.getElementById("speed1").onclick = function () { speed = 2; resetLevel() };
    document.getElementById("speed2").onclick = function () { speed = 5; resetLevel() };
    document.getElementById("speed3").onclick = function () { speed = 10; resetLevel() };
    document.getElementById("soundToggle").onclick = function () { toggleSound() };
    
    // Instructions modal functionality
    document.getElementById("instructions").onclick = function () {
        document.getElementById("instructionsModal").style.display = "block";
    };
    
    document.querySelector(".close").onclick = function () {
        document.getElementById("instructionsModal").style.display = "none";
    };
    
    window.onclick = function (event) {
        const modal = document.getElementById("instructionsModal");
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
    
    // Level selector functionality
    document.getElementById("levelSelect").onchange = function() {
        const newLevel = parseInt(this.value);
        if (newLevel >= 0 && Object.values(levelsObject)[newLevel]) {
            indexLevel = newLevel;
            resetLevel();
        }
    };
    
    // Keyboard controls
    document.addEventListener('keydown', function(event) {
        switch(event.key) {
            case ' ': // Spacebar to start/pause
                event.preventDefault();
                if (pressed == 0) {
                    pressed = 1;
                    start();
                } else {
                    stop();
                }
                break;
            case 'r': // R to reset
            case 'R':
                resetLevel();
                break;
            case 'n': // N for next level
            case 'N':
                nextLevel();
                break;
            case 'p': // P for previous level
            case 'P':
                PreviousLevel();
                break;
        }
    });
    
    // Initialize everything
    initSounds();
    drawLevel(Object.values(levelsObject)[0]);
    updateUI();
    
    // Initialize sound toggle button text
    document.getElementById('soundToggle').textContent = soundEnabled ? '🔊 Sound On' : '🔇 Sound Off';
    //-----------------------------------------------------------------------------------------
    function changeMirror(evt) {
        mousePos = getMousePos(evt);
        const allMirrors = [
            mirrorsPosLevel1, mirrorsPosLevel2, mirrorsPosLevel3, mirrorsPosLevel4
        ];
        
        if (indexLevel < 4 && allMirrors[indexLevel]) {
            mouseReactMirrorPos(allMirrors[indexLevel]);
        }
    }

    function getMousePos(evt) {
        rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top,
        };
    }
    //---------------------------------------------------------------------------------------------
    function mirrorReact(mirrorsPosLevel) {
        for (let i = 0; i < mirrorsPosLevel.length; i++) {
            if (mirrorsPosLevel[i].posX == lazerX && mirrorsPosLevel[i].posY == lazerY) {
                // Add enhanced visual effect when laser hits mirror
                createParticles(lazerX + 30, lazerY + 30, '#ffff00', 8, 'sparkle');
                createParticles(lazerX + 30, lazerY + 30, '#ffffff', 5, 'default');
                if (soundEnabled) sounds.mirror.play().catch(() => playBeep('mirror'));
                
                if (mirrorsPosLevel[i].kind == 'obliquelineleft' && speedX == 0 && speedY == -speed) {
                    speedX = speed;
                    speedY = 0;
                }
                else if (mirrorsPosLevel[i].kind == 'obliquelineRight' && speedX == 0 && speedY == -speed) {
                    speedX = -speed;
                    speedY = 0;
                }
                else if (mirrorsPosLevel[i].kind == 'obliquelineleft' && speedX == 0 && speedY == speed) {
                    speedX = -speed;
                    speedY = 0;
                }
                else if (mirrorsPosLevel[i].kind == 'obliquelineRight' && speedX == 0 && speedY == speed) {
                    speedX = speed;
                    speedY = 0;
                }
                else if (mirrorsPosLevel[i].kind == 'obliquelineleft' && speedY == 0 && speedX == -speed) {
                    speedY = speed;
                    speedX = 0;
                }
                else if (mirrorsPosLevel[i].kind == 'obliquelineRight' && speedY == 0 && speedX == speed) {
                    speedY = speed;
                    speedX = 0;
                }
                else if (mirrorsPosLevel[i].kind == 'obliquelineleft' && speedY == 0 && speedX == speed) {
                    speedY = -speed;
                    speedX = 0;
                }
                else if (mirrorsPosLevel[i].kind == 'obliquelineRight' && speedY == 0 && speedX == -speed) {
                    speedY = -speed;
                    speedX = 0;
                }
            }
        }
    }

    function mouseReactMirrorPos(mirrorsPosLevel) {
        for (let i = 0; i < mirrorsPosLevel.length; i++) {
            if (mousePos.x >= mirrorsPosLevel[i].posX && mousePos.x <= mirrorsPosLevel[i].posX + 60 && mousePos.y >= mirrorsPosLevel[i].posY && mousePos.y <= mirrorsPosLevel[i].posY + 60) {
                // Add visual feedback for mirror rotation
                createParticles(mirrorsPosLevel[i].posX + 30, mirrorsPosLevel[i].posY + 30, '#ffff00', 5, 'sparkle');
                
                if (mirrorsPosLevel[i].kind == 'obliquelineleft') {
                    mirrorsPosLevel[i].kind = 'obliquelineRight';
                    obliquelineRightObject.create(ctx, mirrorsPosLevel[i].posX, mirrorsPosLevel[i].posY);
                }
                else if (mirrorsPosLevel[i].kind == 'obliquelineRight') {
                    mirrorsPosLevel[i].kind = 'obliquelineleft'
                    obliquelineleftObject.create(ctx, mirrorsPosLevel[i].posX, mirrorsPosLevel[i].posY);
                }
                
                // Play sound feedback
                if (soundEnabled) sounds.mirror.play().catch(() => playBeep('mirror'));
            }
        }
    }
    function tryAgain() {
        clearCanvas();
        ctx.font = `${Math.min(sizeOfFont, 80)}px Comic Sans MS`;
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText("Try Again!", canvas.width / 2, canvas.height / 2 - 20);
        
        ctx.font = "20px Comic Sans MS";
        ctx.fillStyle = "#ff6666";
        ctx.fillText(`Lives remaining: ${lives}`, canvas.width / 2, canvas.height / 2 + 20);
        
        sizeOfFont += 2;
        if(sizeOfFont > 120) {
            sizeOfFont = 60;
            resetLevel();
            return;
        }
        requestAnimationFrame(tryAgain);
    }

    function youWon() {
        clearCanvas();
        
        // Display victory message with better formatting
        ctx.font = `${Math.min(sizeOfFont, 80)}px Comic Sans MS`;
        ctx.fillStyle = "green";
        ctx.textAlign = "center";
        ctx.fillText("You Won!", canvas.width / 2, canvas.height / 2 - 40);
        
        // Show level completion info
        ctx.font = "24px Comic Sans MS";
        ctx.fillStyle = "#00ff88";
        ctx.fillText(`Level ${indexLevel + 1} Complete!`, canvas.width / 2, canvas.height / 2 + 10);
        ctx.fillText(`Score: ${score} | Time: ${timeElapsed}s`, canvas.width / 2, canvas.height / 2 + 40);
        
        // Check if this is the final level
        if (!Object.values(levelsObject)[indexLevel + 1]) {
            ctx.fillStyle = "#ffff00";
            ctx.fillText("🎉 Game Complete! 🎉", canvas.width / 2, canvas.height / 2 + 70);
        }
        
        sizeOfFont++;
        if(sizeOfFont > 120) {
            sizeOfFont = 60;
            if (Object.values(levelsObject)[indexLevel + 1]) {
                nextLevel();
            } else {
                // Game completed - show final score
                showGameComplete();
            }
            return;
        }
        requestAnimationFrame(youWon);  
    }
    
    function showGameComplete() {
        clearCanvas();
        
        // Create fireworks effect
        for (let i = 0; i < 100; i++) {
            createParticles(
                Math.random() * canvas.width,
                Math.random() * canvas.height,
                `hsl(${Math.random() * 360}, 80%, 60%)`,
                1,
                'explosion'
            );
        }
        
        ctx.save();
        ctx.font = "48px Comic Sans MS";
        ctx.fillStyle = "#ffff00";
        ctx.textAlign = "center";
        ctx.shadowColor = "#ffff00";
        ctx.shadowBlur = 20;
        ctx.fillText("🎊 CONGRATULATIONS! 🎊", canvas.width / 2, canvas.height / 2 - 60);
        
        ctx.font = "32px Comic Sans MS";
        ctx.fillStyle = "#00ff88";
        ctx.shadowColor = "#00ff88";
        ctx.shadowBlur = 15;
        ctx.fillText("All Levels Complete!", canvas.width / 2, canvas.height / 2 - 10);
        ctx.fillText(`Final Score: ${score}`, canvas.width / 2, canvas.height / 2 + 30);
        
        ctx.font = "24px Comic Sans MS";
        ctx.fillStyle = "#ffd700";
        ctx.shadowColor = "#ffd700";
        ctx.shadowBlur = 10;
        if (maxStreak > 0) {
            ctx.fillText(`Best Streak: ${Math.max(streak, maxStreak)}`, canvas.width / 2, canvas.height / 2 + 70);
        }
        
        ctx.font = "20px Comic Sans MS";
        ctx.fillStyle = "white";
        ctx.shadowBlur = 5;
        ctx.fillText("Press Reset to play again", canvas.width / 2, canvas.height / 2 + 110);
        ctx.restore();
        
        // Continue fireworks animation
        setTimeout(() => {
            if (!Object.values(levelsObject)[indexLevel + 1]) {
                showGameComplete();
            }
        }, 2000);
    }
    
    // NEW: Moving obstacles system
    class MovingObstacle {
        constructor(x, y, vx, vy, size = 30) {
            this.x = x;
            this.y = y;
            this.vx = vx;
            this.vy = vy;
            this.size = size;
            this.color = '#ff6b6b';
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            // Bounce off walls
            if (this.x <= 0 || this.x >= canvas.width - this.size) {
                this.vx = -this.vx;
            }
            if (this.y <= 0 || this.y >= canvas.height - this.size) {
                this.vy = -this.vy;
            }
        }
        
        draw(ctx) {
            ctx.save();
            ctx.fillStyle = this.color;
            ctx.shadowColor = this.color;
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(this.x + this.size/2, this.y + this.size/2, this.size/2, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
        
        checkCollision(lazerX, lazerY, size = 60) {
            const dx = lazerX + size/2 - (this.x + this.size/2);
            const dy = lazerY + size/2 - (this.y + this.size/2);
            const distance = Math.sqrt(dx * dx + dy * dy);
            return distance < (size/2 + this.size/2);
        }
    }
    
    // Initialize moving obstacles for higher levels (disabled for now - no levels 5+)
    function initMovingObstacles(level) {
        movingObstacles = [];
        // Moving obstacles disabled since levels 5+ are not available
        // if (level >= 5) { // Add moving obstacles from level 6 onwards
        //     const count = Math.min(level - 4, 3); // Max 3 moving obstacles
        //     for (let i = 0; i < count; i++) {
        //         movingObstacles.push(new MovingObstacle(
        //             Math.random() * (canvas.width - 60) + 30,
        //             Math.random() * (canvas.height - 60) + 30,
        //             (Math.random() - 0.5) * 4,
        //             (Math.random() - 0.5) * 4
        //         ));
        //     }
        // }
    }
    
    // Update and draw moving obstacles
    function updateMovingObstacles() {
        movingObstacles.forEach(obstacle => {
            obstacle.update();
            obstacle.draw(ctx);
            
            // Check collision with laser
            if (obstacle.checkCollision(lazerX, lazerY)) {
                createParticles(lazerX + 30, lazerY + 30, '#ff0000', 10);
                if (soundEnabled) sounds.hit.play().catch(() => playBeep('hit'));
                lives--;
                updateUI();
                if (lives <= 0) {
                    gameOver();
                } else {
                    tryAgain();
                }
                return true;
            }
        });
        return false;
    }
    
    // NEW: Power-ups system
    class PowerUp {
        constructor(x, y, type) {
            this.x = x;
            this.y = y;
            this.type = type; // 'life', 'score', 'slow'
            this.size = 30;
            this.pulseTime = 0;
            this.active = true;
        }
        
        draw(ctx) {
            if (!this.active) return;
            
            this.pulseTime += 0.1;
            const pulse = Math.sin(this.pulseTime) * 5;
            
            ctx.save();
            const colors = {
                life: '#ff69b4',
                score: '#ffd700',
                slow: '#00bfff'
            };
            
            ctx.fillStyle = colors[this.type] || '#ffffff';
            ctx.shadowColor = ctx.fillStyle;
            ctx.shadowBlur = 10 + pulse;
            
            ctx.beginPath();
            ctx.arc(this.x + this.size/2, this.y + this.size/2, this.size/2 + pulse, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw icon
            ctx.fillStyle = '#fff';
            ctx.font = '16px Arial';
            ctx.textAlign = 'center';
            const icons = { life: '❤️', score: '⭐', slow: '⏰' };
            ctx.fillText(icons[this.type], this.x + this.size/2, this.y + this.size/2 + 5);
            
            ctx.restore();
        }
        
        checkCollision(lazerX, lazerY, size = 60) {
            if (!this.active) return false;
            
            const dx = lazerX + size/2 - (this.x + this.size/2);
            const dy = lazerY + size/2 - (this.y + this.size/2);
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < (size/2 + this.size/2)) {
                this.active = false;
                this.applyEffect();
                return true;
            }
            return false;
        }
        
        applyEffect() {
            createParticles(this.x + this.size/2, this.y + this.size/2, '#ffd700', 8);
            
            switch(this.type) {
                case 'life':
                    lives = Math.min(lives + 1, 5);
                    break;
                case 'score':
                    updateScore(50);
                    break;
                case 'slow':
                    // Temporarily slow down moving obstacles
                    setTimeout(() => {
                        movingObstacles.forEach(obs => {
                            obs.vx *= 0.5;
                            obs.vy *= 0.5;
                        });
                    }, 100);
                    break;
            }
            updateUI();
        }
    }
    
    // Spawn random power-ups occasionally
    function spawnPowerUp() {
        if (Math.random() < 0.1 && powerUps.length < 2) { // 10% chance, max 2 active
            const types = ['life', 'score', 'slow'];
            const type = types[Math.floor(Math.random() * types.length)];
            powerUps.push(new PowerUp(
                Math.random() * (canvas.width - 60) + 30,
                Math.random() * (canvas.height - 60) + 30,
                type
            ));
        }
    }
    
    // Update power-ups
    function updatePowerUps() {
        powerUps = powerUps.filter(powerUp => {
            powerUp.draw(ctx);
            if (powerUp.checkCollision(lazerX, lazerY)) {
                if (soundEnabled) sounds.win.play().catch(() => playBeep('win'));
                return false; // Remove collected power-up
            }
            return powerUp.active;
        });
    }
};

//TODO:add moving obstacles and targets and mirrors.
//TODO:add 360 degrees at first with 2d , can add oblique movement to 
//add more options to level building.


