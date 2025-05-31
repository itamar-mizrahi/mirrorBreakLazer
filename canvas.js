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
    let mirrorsPosLevel1 = [], mirrorsPosLevel2 = [], mirrorsPosLevel3 = [],mirrorsPosLevel4 = [];
    let planetsPosLevel1 = [], planetsPosLevel2 = [], planetsPosLevel3 = [],planetsPosLevel4 = [];
    let lazerPosLevel1 = [], lazerPosLevel2 = [], lazerPosLevel3 = [],lazerPosLevel4 = [];
    let spaceshipPosLevel1 = [], spaceshipPosLevel2 = [], spaceshipPosLevel3 = [], spaceshipPosLevel4 = [];
    let sizeOfFont=60;
    let mousePos=0;
    let rect=0;
    //---------------------------------------------------------------------
    function drawLevel(level) {
         mirrorsPosLevel1 = [], mirrorsPosLevel2 = [], mirrorsPosLevel3 = [],mirrorsPosLevel4 = [];
         planetsPosLevel1 = [], planetsPosLevel2 = [], planetsPosLevel3 = [],planetsPosLevel4 = [];
         lazerPosLevel1 = [], lazerPosLevel2 = [], lazerPosLevel3 = [],lazerPosLevel4 = [];
         spaceshipPosLevel1 = [], spaceshipPosLevel2 = [], spaceshipPosLevel3 = [], spaceshipPosLevel4 = [];

        for (let i = 0; i < level.length; i++) {
            objectsPosition[i] = []
            for (let j = 0; j < level[i].length; j++) {
                if (level[i][j] === 1) {
                    spaceshipObject.create(ctx, j * x, i * y);
                    objectsPosition[i][j] = {
                        posX: j * x,
                        posY: i * y,
                        kind: 'spaceship'
                    }
                    if (indexLevel == 0) {
                        spaceshipPosLevel1.push(objectsPosition[i][j]);
                    }
                    else if (indexLevel == 1) {
                        spaceshipPosLevel2.push(objectsPosition[i][j]);
                    }
                    else if (indexLevel == 2) {
                        spaceshipPosLevel3.push(objectsPosition[i][j]);
                    }
                    else if (indexLevel == 3) {
                        spaceshipPosLevel4.push(objectsPosition[i][j]);
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
                    if (indexLevel == 0) {
                        lazerPosLevel1.push(objectsPosition[i][j]);
                    }
                    else if (indexLevel == 1) {
                        lazerPosLevel2.push(objectsPosition[i][j]);
                    }
                    else if (indexLevel == 2) {
                        lazerPosLevel3.push(objectsPosition[i][j]);
                    }
                    else if (indexLevel == 3) {
                        lazerPosLevel4.push(objectsPosition[i][j]);
                    }
                }
                else if (level[i][j] === 3) {
                    plantObject.create(ctx, j * x, i * y);
                    objectsPosition[i][j] = {
                        posX: j * x,
                        posY: i * y,
                        kind: 'planet'
                    }
                    if (indexLevel == 0) {
                        planetsPosLevel1.push(objectsPosition[i][j]);
                    }
                    else if (indexLevel == 1) {
                        planetsPosLevel2.push(objectsPosition[i][j]);
                    }
                    else if (indexLevel == 2) {
                        planetsPosLevel3.push(objectsPosition[i][j]);
                    }
                    else if (indexLevel == 3) {
                        planetsPosLevel4.push(objectsPosition[i][j]);
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
                    if (indexLevel == 0) {
                        mirrorsPosLevel1.push(objectsPosition[i][j])
                    }
                    else if (indexLevel == 1) {
                        mirrorsPosLevel2.push(objectsPosition[i][j])
                    }
                    else if (indexLevel == 2) {
                        mirrorsPosLevel3.push(objectsPosition[i][j])
                    }
                    else if (indexLevel == 3) {
                        mirrorsPosLevel4.push(objectsPosition[i][j])
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
                    if (indexLevel == 0) {
                        mirrorsPosLevel1.push(objectsPosition[i][j])
                    }
                    else if (indexLevel == 1) {
                        mirrorsPosLevel2.push(objectsPosition[i][j])
                    }
                    else if (indexLevel == 2) {
                        mirrorsPosLevel3.push(objectsPosition[i][j])
                    }
                    else if (indexLevel == 3) {
                        mirrorsPosLevel4.push(objectsPosition[i][j])
                    }
                }
            }
        }
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // -----------functions-to-buttons:---------------------------------------------------------------
    function start() {
        let currentSpaceships, currentLazers, currentPlanets, currentMirrors;
        
        if (indexLevel == 0) {
            currentSpaceships = spaceshipPosLevel1;
            currentLazers = lazerPosLevel1;
            currentPlanets = planetsPosLevel1;
            currentMirrors = mirrorsPosLevel1;
        } else if (indexLevel == 1) {
            currentSpaceships = spaceshipPosLevel2;
            currentLazers = lazerPosLevel2;
            currentPlanets = planetsPosLevel2;
            currentMirrors = mirrorsPosLevel2;
        } else if (indexLevel == 2) {
            currentSpaceships = spaceshipPosLevel3;
            currentLazers = lazerPosLevel3;
            currentPlanets = planetsPosLevel3;
            currentMirrors = mirrorsPosLevel3;
        } else if (indexLevel == 3) {
            currentSpaceships = spaceshipPosLevel4;
            currentLazers = lazerPosLevel4;
            currentPlanets = planetsPosLevel4;
            currentMirrors = mirrorsPosLevel4;
        }

        // Check if laser hits any spaceship (target)
        for (let i = 0; i < currentSpaceships.length; i++) {
            if (lazerX == currentSpaceships[i].posX && lazerY == currentSpaceships[i].posY) {
                youWon();
                return;
            }
        }

        // Set initial laser direction based on level
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
                tryAgain();
                return;
            }
        }
        
        if (lazerX < 0 || lazerY < 0 || lazerX > canvas.width || lazerY > canvas.height) {
            tryAgain();
            return;
        }
        lazerY += speedY;
        lazerX += speedX;
        lazerObject.create(ctx, lazerX, lazerY, speed * 2);
        stopIDStart = requestAnimationFrame(start);
    }

    function stop() {
        cancelAnimationFrame(stopIDStart);
        pressed = 0;
    }

    function nextLevel() {
        if (Object.values(levelsObject)[indexLevel + 1]) {
            indexLevel++;
        }
        cancelAnimationFrame(stopIDStart);
        clearCanvas();
        drawLevel(Object.values(levelsObject)[indexLevel]);
        pressed = 0;
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
    drawLevel(Object.values(levelsObject)[0]);
    //-----------------------------------------------------------------------------------------
    function changeMirror(evt) {
        mousePos = getMousePos(evt);
        if (indexLevel == 0) {
            mouseReactMirrorPos(mirrorsPosLevel1);
        }
        if (indexLevel == 1) {
            mouseReactMirrorPos(mirrorsPosLevel2);
        }
        if (indexLevel == 2) {
            mouseReactMirrorPos(mirrorsPosLevel3);
        }
        if (indexLevel == 3) {
            mouseReactMirrorPos(mirrorsPosLevel4);
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
                if (mirrorsPosLevel[i].kind == 'obliquelineleft') {
                    mirrorsPosLevel[i].kind = 'obliquelineRight';
                    obliquelineRightObject.create(ctx, mirrorsPosLevel[i].posX, mirrorsPosLevel[i].posY);
                }
                else if (mirrorsPosLevel[i].kind == 'obliquelineRight') {
                    mirrorsPosLevel[i].kind = 'obliquelineleft'
                    obliquelineleftObject.create(ctx, mirrorsPosLevel[i].posX, mirrorsPosLevel[i].posY);
                }
            }
        }
    }
    function tryAgain() {
        clearCanvas();
        ctx.font = `${sizeOfFont}px Comic Sans MS`;
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText("try again", canvas.width / 2, canvas.height / 2);
        sizeOfFont++;
        if(sizeOfFont>120) {
            sizeOfFont=60;
            resetLevel();
            return;
        }
        requestAnimationFrame(tryAgain);
    }

    function youWon() {
        clearCanvas();
        ctx.font = `${sizeOfFont}px Comic Sans MS`;
        ctx.fillStyle = "green";
        ctx.textAlign = "center";
        ctx.fillText("You Won!", canvas.width / 2, canvas.height / 2);
        sizeOfFont++;
        if(sizeOfFont>120) {
            sizeOfFont=60;
            nextLevel();
            return;
        }
        requestAnimationFrame(youWon);  
    }
};

//TODO:add moving obstacles and targets and mirrors.
//TODO:add 360 degrees at first with 2d , can add oblique movement to 
//add more options to level building.
 

