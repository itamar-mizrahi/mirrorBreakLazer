import { Moon } from './moon.js';
import { Obliquelineleft } from './obliquelineleft.js';
import { ObliquelineRight } from './obliquelineRight.js';
import { Spaceship } from './spaceship.js';
import { Lazer } from './lazer.js';
import { Levels } from './levels.js';
 window.onload =function() {
    const x=60,y=60;
    let stopId=0;
    let indexLevel=0;
    let lazerY=0,lazerX=0;
    let lazerObject=new Lazer();
    let spaceshipObject=new Spaceship();
    let moonObject=new Moon();
    let obliquelineleftObject=new Obliquelineleft();
    let obliquelineRightObject=new ObliquelineRight();
    let levelsObject=new Levels();
    let canvas = document.getElementById('mirrorBreakLazer');
    let ctx = canvas.getContext('2d');
    let clickX=0,clickY=0;
    //---------------------------------------------------------------------
    function drawLevel(level) {
        for (let i=0; i<level.length; i++){
            for (let j=0; j<level[i].length; j++){  
                 if(level[i][j]===1){
                    spaceshipObject.create(ctx,j*x,i*y);
                }else if(level[i][j]===2){
                    lazerObject.create(ctx,j*x,i*y);
                    lazerX=j*x;
                    lazerY=i*y;
                }
                else if(level[i][j]===3){
                    moonObject.create(ctx,j*x,i*y); 
                }
                else if(level[i][j]===4){
                    obliquelineleftObject.create(ctx,j*x,i*y); 
                }
                else if(level[i][j]===5){
                    obliquelineRightObject.create(ctx,j*x,i*y); 
                }
            }
        } 
    }
    function clearCanvas(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
   // -----------functions-to-buttons:----------------------------------------
    
   function start(){   
    lazerY+=y;  
    lazerObject.create(ctx,lazerX,lazerY);
    }

    function stop(){
        clearInterval(stopId);
    }

   function nextLevel(){
        if(Object.values(levelsObject)[indexLevel+1]){
            indexLevel++;
        }
        clearInterval(stopId);
        clearCanvas();
        drawLevel(Object.values(levelsObject)[indexLevel]);
    }

    function resetLevel(){
        clearInterval(stopId);
        clearCanvas();
        drawLevel(Object.values(levelsObject)[indexLevel]);
    }

    document.getElementById("start").onclick = function() {stopId=setInterval(start,150);};
    document.getElementById("pause").onclick = function() {stop()};
    document.getElementById("next").onclick = function() {nextLevel()};
    document.getElementById("reset").onclick = function() {resetLevel()};

    drawLevel(Object.values(levelsObject)[0]);

//---------------------------------------------------------------------

canvas.addEventListener("mousedown",changeMirror,false);
function changeMirror(evt) {
    let mousePos = getMousePos(canvas, evt);
    console.log(Math.floor(mousePos.x) + ',' + Math.floor(mousePos.y));
    }

    function getMousePos(canvas, evt) {
        let rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top,
        };
    }
    
}; 
