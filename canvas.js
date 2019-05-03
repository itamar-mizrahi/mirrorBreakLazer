import { Moon } from './moon.js';
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
    let moonObject = new Moon();
    let obliquelineleftObject = new Obliquelineleft();
    let obliquelineRightObject = new ObliquelineRight();
    let levelsObject = new Levels();
    let canvas = document.getElementById('mirrorBreakLazer');
    let ctx = canvas.getContext('2d');
    let stopIDStart = 0;
    let stopIDMove = 0;
    let objectsPosition = [];
    let pressed = 0;
    let stopTest = 0;
    let speed = 1;
    //---------------------------------------------------------------------
    function drawLevel(level) {
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
                } else if (level[i][j] === 2) {
                    lazerObject.create(ctx, j * x, i * y);
                    lazerX = j * x;
                    lazerY = i * y;
                }
                else if (level[i][j] === 3) {
                    moonObject.create(ctx, j * x, i * y);
                    objectsPosition[i][j] = {
                        posX: j * x,
                        posY: i * y,
                        kind: 'moon'
                    }
                }
                else if (level[i][j] === 4) {
                    obliquelineleftObject.create(ctx, j * x, i * y);
                    objectsPosition[i][j] = {
                        posX: j * x,
                        posY: i * y,
                        kind: 'obliquelineleft'
                    }
                }
                else if (level[i][j] === 5) {
                    obliquelineRightObject.create(ctx, j * x, i * y);
                    objectsPosition[i][j] = {
                        posX: j * x,
                        posY: i * y,
                        kind: 'obliquelineRight'
                    }
                }
            }
        }
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    /* function movetest(){
         if (mirrorsPosLevel1[0].kind == 'obliquelineleft') {
             lazerY += x / 60;
             lazerObject.create(ctx, lazerX, lazerY);
             stopTest = requestAnimationFrame(movetest);
          
         }
         else if (mirrorsPosLevel1[0].kind == 'obliquelineRight') {
             lazerY -= x / 60;
             lazerObject.create(ctx, lazerX, lazerY);
             stopTest = requestAnimationFrame(movetest);
               
         }
       
     }*/

    let startAnim = 0;
    // -----------functions-to-buttons:----------------------------------------
    function start(timestamp) {
        /* (pressed == 0) { startAnim = 0; pressed = 1 }
       if (pressed == 1) {
            if (!startAnim) startAnim = timestamp;
            let progress = timestamp - startAnim;
            console.log(Math.floor(progress));
            if (Math.floor(progress) > 0 && Math.floor(progress) < 2100) {
                lazerY += 1;
                lazerObject.create(ctx, lazerX, lazerY);
            }
            if (Math.floor(progress) > 2100 &&Math.floor(progress) < 6100) {
                //if (indexLevel == 0 && lazerY == mirrorsPosLevel1[1].posY && lazerX == mirrorsPosLevel1[1].posX) {
                //cancelAnimationFrame(stopIDStart);
                // move();
                if (mirrorsPosLevel1[1].kind == 'obliquelineleft') {
                    lazerX -= 1;

                    lazerObject.create(ctx, lazerX, lazerY);
                }
                else if (mirrorsPosLevel1[1].kind == 'obliquelineRight') {
                    lazerX += 1;
                    lazerObject.create(ctx, lazerX, lazerY);
                }
            }
            if (Math.floor(progress) > 6100 &&Math.floor(progress) < 8100) {
                //if (indexLevel == 0 && lazerY == mirrorsPosLevel1[1].posY && lazerX == mirrorsPosLevel1[1].posX) {
                //cancelAnimationFrame(stopIDStart);
                // move();
                if (mirrorsPosLevel1[0].kind == 'obliquelineleft') {
                    lazerY += 1;

                    lazerObject.create(ctx, lazerX, lazerY);
                }
                else if (mirrorsPosLevel1[0].kind == 'obliquelineRight') {
                    lazerY -= 1;
                    lazerObject.create(ctx, lazerX, lazerY);
                }
            }
            
            stopIDStart = requestAnimationFrame(start);
        }
        */
        if (indexLevel == 0) {
            if (lazerY < mirrorsPosLevel1[1].posY && lazerX == mirrorsPosLevel1[1].posX) {
                lazerY += speed;
                lazerObject.create(ctx, lazerX, lazerY);
                console.log(lazerX, lazerY);

            }
            if (lazerY == mirrorsPosLevel1[1].posY && lazerX > mirrorsPosLevel1[0].posX) {
                if (mirrorsPosLevel1[1].kind == 'obliquelineleft') {
                    lazerX -= speed;
                    lazerObject.create(ctx, lazerX, lazerY);
                    console.log(lazerX, lazerY);
                }
                else if (mirrorsPosLevel1[1].kind == 'obliquelineRight') {
                    lazerX += speed;
                    lazerObject.create(ctx, lazerX, lazerY);
                    console.log(lazerX, lazerY);
                }
            }
            if (lazerX == mirrorsPosLevel1[0].posX && lazerY < mirrorsPosLevel1[2].posY) {
                if (mirrorsPosLevel1[0].kind == 'obliquelineleft') {
                    lazerY += speed;
                    lazerObject.create(ctx, lazerX, lazerY);
                    console.log(lazerX, lazerY);
                }
                else if (mirrorsPosLevel1[0].kind == 'obliquelineRight') {
                    lazerY -= speed;
                    lazerObject.create(ctx, lazerX, lazerY);
                    console.log(lazerX, lazerY);
                }
            }
            if (lazerY == mirrorsPosLevel1[2].posY && lazerX < mirrorsPosLevel1[3].posX) {
                if (mirrorsPosLevel1[2].kind == 'obliquelineleft') {
                    lazerX -= speed;
                    lazerObject.create(ctx, lazerX, lazerY);
                    console.log(lazerX, lazerY);
                }
                else if (mirrorsPosLevel1[2].kind == 'obliquelineRight') {
                    lazerX += speed;
                    lazerObject.create(ctx, lazerX, lazerY);
                    console.log(lazerX, lazerY);
                }
            }
            if (lazerX == mirrorsPosLevel1[3].posX && lazerY < mirrorsPosLevel1[4].posY && lazerY > mirrorsPosLevel1[1].posY) {
                if (mirrorsPosLevel1[3].kind == 'obliquelineleft') {
                    lazerY -= speed;
                    lazerObject.create(ctx, lazerX, lazerY);
                    console.log(lazerX, lazerY);
                }
                else if (mirrorsPosLevel1[3].kind == 'obliquelineRight') {
                    lazerY += speed;
                    lazerObject.create(ctx, lazerX, lazerY);
                    console.log(lazerX, lazerY);
                }
            }
            if (lazerY == mirrorsPosLevel1[4].posY && lazerX > 0) {
                if (mirrorsPosLevel1[4].kind == 'obliquelineleft') {
                    lazerX -= speed;
                    lazerObject.create(ctx, lazerX, lazerY);
                    console.log(lazerX, lazerY);
                }
                else if (mirrorsPosLevel1[4].kind == 'obliquelineRight') {
                    lazerX += speed;
                    lazerObject.create(ctx, lazerX, lazerY);
                    console.log(lazerX, lazerY);
                }
            }
            if (lazerX == objectsPosition[7][0].posX+60 && lazerY == objectsPosition[7][0].posY) {nextLevel()}

            else if(lazerX<60||lazerY<60||lazerX>canvas.width-120||lazerY>canvas.height-120) {resetLevel()}
            
            else{stopIDStart = requestAnimationFrame(start);}
        }
        
    }
    function stop() {
        cancelAnimationFrame(stopIDStart);
    }

    function nextLevel() {
        if (Object.values(levelsObject)[indexLevel + 1]) {
            indexLevel++;
            pressed = 0;
        }
        cancelAnimationFrame(stopIDStart);
        clearCanvas();
        drawLevel(Object.values(levelsObject)[indexLevel]);
        mirrorsPosLevel1 = [
            objectsPosition[3][2],
            objectsPosition[3][6],
            objectsPosition[5][2],
            objectsPosition[5][6],
            objectsPosition[7][6]]
        pressed = 0;
    }
    function PreviousLevel() {
        if (Object.values(levelsObject)[indexLevel - 1]) {
            indexLevel--;
            pressed = 0;
        }
        cancelAnimationFrame(stopIDStart);
        clearCanvas();
        drawLevel(Object.values(levelsObject)[indexLevel]);
        mirrorsPosLevel1 = [
            objectsPosition[3][2],
            objectsPosition[3][6],
            objectsPosition[5][2],
            objectsPosition[5][6],
            objectsPosition[7][6]]
        pressed = 0;
    }

    function resetLevel() {
        cancelAnimationFrame(stopIDStart);
        clearCanvas();
        drawLevel(Object.values(levelsObject)[indexLevel]);
        mirrorsPosLevel1 = [
            objectsPosition[3][2],
            objectsPosition[3][6],
            objectsPosition[5][2],
            objectsPosition[5][6],
            objectsPosition[7][6]]
        pressed = 0;

    }

    document.getElementById("start").onclick = function () { start() };
    document.getElementById("pause").onclick = function () { stop() };
    document.getElementById("next").onclick = function () { nextLevel() };
    document.getElementById("previous").onclick = function () { PreviousLevel() };
    document.getElementById("reset").onclick = function () { resetLevel() };
    document.getElementById("speed1").onclick = function () { speed = 1 };
    document.getElementById("speed2").onclick = function () { speed = 2 };
    document.getElementById("speed3").onclick = function () { speed = 5 };

    drawLevel(Object.values(levelsObject)[0]);

    //---------------------------------------------------------------------
    let mirrorsPosLevel1 = [
        objectsPosition[3][2],
        objectsPosition[3][6],
        objectsPosition[5][2],
        objectsPosition[5][6],
        objectsPosition[7][6]
    ];
    canvas.addEventListener("mousedown", changeMirror, false);
    function changeMirror(evt) {
        let mousePos = getMousePos(canvas, evt);
        for (let i = 0; i < mirrorsPosLevel1.length; i++) {
            if (indexLevel == 0 && mousePos.x >= mirrorsPosLevel1[i].posX && mousePos.x <= mirrorsPosLevel1[i].posX + 60 && mousePos.y >= mirrorsPosLevel1[i].posY && mousePos.y <= mirrorsPosLevel1[i].posY + 60) {
                console.log(Math.floor(mousePos.x), Math.floor(mousePos.y));
                if (mirrorsPosLevel1[i].kind == 'obliquelineleft') {
                    mirrorsPosLevel1[i].kind = 'obliquelineRight';
                    console.log(mirrorsPosLevel1[i].kind);
                    console.log(objectsPosition[3][2].kind);
                    obliquelineRightObject.create(ctx, mirrorsPosLevel1[i].posX, mirrorsPosLevel1[i].posY);
                }
                else if (mirrorsPosLevel1[i].kind == 'obliquelineRight') {
                    mirrorsPosLevel1[i].kind = 'obliquelineleft'
                    console.log(mirrorsPosLevel1[i].kind);
                    console.log(objectsPosition[3][2].kind);
                    obliquelineleftObject.create(ctx, mirrorsPosLevel1[i].posX, mirrorsPosLevel1[i].posY);
                }

            }
        }
    }
    function getMousePos(canvas, evt) {
        let rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top,
        };
    }

};

