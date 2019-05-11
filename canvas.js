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
    let mirrorsPosLevel1 = [], mirrorsPosLevel2 = [], mirrorsPosLevel3 = [];
    let planetsPosLevel1 = [], planetsPosLevel2 = [], planetsPosLevel3 = [];
    let lazerPosLevel1 = [], lazerPosLevel2 = [], lazerPosLevel3 = [];
    let spaceshipPosLevel1 = [], spaceshipPosLevel2 = [], spaceshipPosLevel3 = [];
    let sizeOfFont=60;
    //---------------------------------------------------------------------
    function drawLevel(level) {
        mirrorsPosLevel1 = [], mirrorsPosLevel2 = [], mirrorsPosLevel3 = [];
        planetsPosLevel1 = [], planetsPosLevel2 = [], planetsPosLevel3 = [];
        lazerPosLevel1 = [], lazerPosLevel2 = [], lazerPosLevel3 = [];
        spaceshipPosLevel1 = [], spaceshipPosLevel2 = [], spaceshipPosLevel3 = [];

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
                } else if (level[i][j] === 2) {
                    lazerObject.create(ctx, j * x, i * y, speed * 5);
                    lazerX = j * x;
                    lazerY = i * y;
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
                }
            }
        }
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // -----------functions-to-buttons:---------------------------------------------------------------
    function start() {
        if (indexLevel == 0) {
            if (lazerX == spaceshipPosLevel1[1].posX + 60 && lazerY == spaceshipPosLevel1[1].posY) {
                youWon();
                return;
            }
            if (lazerY == lazerPosLevel1[0].posY && lazerX == lazerPosLevel1[0].posX) {
                speedX = 0;
                speedY = speed;
            }
            mirrorReact(mirrorsPosLevel1);
            for (let i = 0; i < planetsPosLevel1.length; i++) {
                if (lazerX == planetsPosLevel1[i].posX && lazerY == planetsPosLevel1[i].posY) {
                    tryAgain();
                    return;
                }
            }

        }
        if (indexLevel == 1) {
            if (lazerX == spaceshipPosLevel2[1].posX && lazerY == spaceshipPosLevel2[1].posY) {
                youWon();
                return;
            }
            if (lazerY == lazerPosLevel2[0].posY && lazerX == lazerPosLevel2[0].posX) {
                speedY = 0;
                speedX = -speed;
            }
            mirrorReact(mirrorsPosLevel2);
            for (let i = 0; i < planetsPosLevel2.length; i++) {
                if (lazerX == planetsPosLevel2[i].posX && lazerY == planetsPosLevel2[i].posY) {
                    tryAgain();
                    return;
                }
            }
        }
        if (indexLevel == 2) {
            if (lazerX == spaceshipPosLevel3[0].posX && lazerY == spaceshipPosLevel3[0].posY) {
                youWon();
                return;
            }
            if (lazerY == lazerPosLevel3[0].posY && lazerX == lazerPosLevel3[0].posX) {
                speedY = 0;
                speedX = speed;
            }
            mirrorReact(mirrorsPosLevel3);
            for (let i = 0; i < planetsPosLevel3.length; i++) {
                if (lazerX == planetsPosLevel3[i].posX && lazerY == planetsPosLevel3[i].posY) {
                    tryAgain();
                    return;
                }
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
        let mousePos = getMousePos(canvas, evt);
        if (indexLevel == 0) {
            mouseReactMirrorPos(mirrorsPosLevel1, mousePos)
        }
        if (indexLevel == 1) {
            mouseReactMirrorPos(mirrorsPosLevel2, mousePos);
        }
        if (indexLevel == 2) {
            mouseReactMirrorPos(mirrorsPosLevel3, mousePos);
        }

    }

    function getMousePos(canvas, evt) {
        let rect = canvas.getBoundingClientRect();
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

    function mouseReactMirrorPos(mirrorsPosLevel, mousePos) {
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

