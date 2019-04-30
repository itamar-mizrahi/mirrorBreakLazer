import { Moon } from './moon.js';
import { Obliquelineleft } from './obliquelineleft.js';
import { ObliquelineRight } from './obliquelineRight.js';
import { Spaceship } from './spaceship.js';
import { Lazer } from './lazer.js';
import { Levels } from './levels.js';
 window.onload =function() {
    const x=60,y=60;
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
    let stopID=0;
    let objectsPosition=[]
    //---------------------------------------------------------------------
    function drawLevel(level) {
        for (let i=0; i<level.length; i++){
            objectsPosition[i]=[]
            for (let j=0; j<level[i].length; j++){  
                 if(level[i][j]===1){
                    spaceshipObject.create(ctx,j*x,i*y);
                    objectsPosition[i][j]={
                        posX: j*x,
                        posY: i*y,
                        kind: 'spaceship'
                    }
                }else if(level[i][j]===2){
                    lazerObject.create(ctx,j*x,i*y);
                    lazerX=j*x;
                    lazerY=i*y;
                }
                else if(level[i][j]===3){
                    moonObject.create(ctx,j*x,i*y); 
                    objectsPosition[i][j]={
                        posX: j*x,
                        posY: i*y,
                        kind:'moon'
                    }
                }
                else if(level[i][j]===4){
                    obliquelineleftObject.create(ctx,j*x,i*y);
                    objectsPosition[i][j]={
                        posX: j*x,
                        posY: i*y,
                        kind:'obliquelineleft'
                    }
                }
                else if(level[i][j]===5){
                    obliquelineRightObject.create(ctx,j*x,i*y);
                    objectsPosition[i][j]={
                        posX: j*x,
                        posY: i*y,
                        kind:'obliquelineRight'
                    } 
                }
            }
        } 
    }
    function clearCanvas(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
   // -----------functions-to-buttons:----------------------------------------
    
   function start(){   
    lazerY+=y/60;
    lazerX-=x/60;  
    lazerObject.create(ctx,lazerX,lazerY);
    stopID=requestAnimationFrame(start);
    }

    function stop(){
        cancelAnimationFrame(stopID);
    }

   function nextLevel(){
        if(Object.values(levelsObject)[indexLevel+1]){
            indexLevel++;
        }
        cancelAnimationFrame(stopID);
        clearCanvas();
        drawLevel(Object.values(levelsObject)[indexLevel]);
    }
    function PreviousLevel(){
        if(Object.values(levelsObject)[indexLevel-1]){
            indexLevel--;
        }
        cancelAnimationFrame(stopID);
        clearCanvas();
        drawLevel(Object.values(levelsObject)[indexLevel]);
    }

    function resetLevel(){
        cancelAnimationFrame(stopID);
        clearCanvas();
        drawLevel(Object.values(levelsObject)[indexLevel]);
    }

    document.getElementById("start").onclick = function() {start()};
    document.getElementById("pause").onclick = function() {stop()};
    document.getElementById("next").onclick = function() {nextLevel()};
    document.getElementById("previous").onclick = function() {PreviousLevel()};
    document.getElementById("reset").onclick = function() {resetLevel()};

    drawLevel(Object.values(levelsObject)[0]);
    

//---------------------------------------------------------------------

    canvas.addEventListener("mousedown",changeMirror,false);
    function changeMirror(evt) {
        let mousePos = getMousePos(canvas, evt);
        if(indexLevel==0&&mousePos.x>=objectsPosition[3][2].posX&&mousePos.x<=objectsPosition[3][2].posX+60&&mousePos.y>=objectsPosition[3][2].posY&&mousePos.y<=objectsPosition[3][2].posY+60){
            console.log(Math.floor(mousePos.x), Math.floor(mousePos.y)); 
            if(objectsPosition[3][2].kind=='obliquelineleft'){
               objectsPosition[3][2].kind='obliquelineRight'
               console.log(objectsPosition[3][2]);
               obliquelineRightObject.create(ctx,objectsPosition[3][2].posX,objectsPosition[3][2].posY)
            } 
            else if(objectsPosition[3][2].kind=='obliquelineRight'){
                objectsPosition[3][2].kind='obliquelineleft'
                console.log(objectsPosition[3][2]);
                obliquelineleftObject.create(ctx,objectsPosition[3][2].posX,objectsPosition[3][2].posY)
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