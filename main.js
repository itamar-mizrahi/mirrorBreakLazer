import { Moon } from './moon.js';
import { Obliquelineleft } from './obliquelineleft.js';
import { ObliquelineRight } from './obliquelineRight.js';
import { Spaceship } from './spaceship.js';
import { Lazer } from './lazer.js';
import { Levels } from './levels.js';
window.onload = function() {
    const x=60,y=60;
    let indexLevel=0;
    let lazerCor=[]
    let lazerObject=new Lazer();
    let spaceshipObject=new Spaceship();
    let moonObject=new Moon();
    let obliquelineleftObject=new Obliquelineleft();
    let obliquelineRightObject=new ObliquelineRight();
    let levelsObject=new Levels();
    let canvas = document.getElementById('mirrorBreakLazer');
    let ctx = canvas.getContext('2d');
    function drawLevel(level) {
        for (let i=0; i<level.length; i++){
            for (let j=0; j<level[i].length; j++){  
                 if(level[i][j]===1){
                    spaceshipObject.create(ctx,j*x,i*y);
                }else if(level[i][j]===2){
                    lazerObject.create(ctx,j*x,i*y);
                    lazerCor[0]=j*x;
                    lazerCor[1]=i*y;
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
    function nextLevel(){
        if(Object.values(levelsObject)[indexLevel+1]){
            indexLevel++;
        }
        clearCanvas();
        drawLevel(Object.values(levelsObject)[indexLevel]);
    }
    function resetLevel(){
        drawLevel(Object.values(levelsObject)[indexLevel]);
    }
    //levelsObject.drawLevel();
    //drawLevel(Object.values(Levels)[0]);
    drawLevel(Object.values(levelsObject)[0]);
    function start(){
    lazerCor[1]+=y;  
    lazerObject.create(ctx,lazerCor[0],lazerCor[1]);
    console.log(lazerCor[1]);
    }
    document.getElementById("start").onclick = function() {requestAnimationFrame(start)};
    document.getElementById("pause").onclick = function() {};
    document.getElementById("next").onclick = function() {nextLevel()};
    document.getElementById("reset").onclick = function() {resetLevel()};
};    
