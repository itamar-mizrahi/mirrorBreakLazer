import { Moon } from './moon.js';
import { Obliquelineleft } from './obliquelineleft.js';
import { ObliquelineRight } from './obliquelineRight.js';
import { Spaceship } from './spaceship.js';
import { Lazer } from './lazer.js';
import { Levels } from './levels.js';
window.onload = function() {
    const x=60,y=60;
    let canvas = document.getElementById('mirrorBreakLazer');
    let ctx = canvas.getContext('2d');
    function drawLevel(level) {
        for (let i=0; i<level.length; i++){
            for (let j=0; j<level[i].length; j++){  
                 if(level[i][j]===1){
                    let spaceship=new Spaceship();
                    spaceship.create(ctx,j*x,i*y);
                }else if(level[i][j]===2){
                    let lazer=new Lazer();
                    lazer.create(ctx,j*x,i*y);
                }
                else if(level[i][j]===3){
                    let moon=new Moon();
                    moon.create(ctx,j*x,i*y); 
                }
                else if(level[i][j]===4){
                    let obliquelineleft=new Obliquelineleft();
                    obliquelineleft.create(ctx,j*x,i*y); 
                }
                else if(level[i][j]===5){
                    let obliquelineRight=new ObliquelineRight();
                    obliquelineRight.create(ctx,j*x,i*y); 
                }
            }
        }
    }
    
let indexLevel=0;
    function clearCanvas(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    function nextLevel(){
        if(Object.values(Levels)[indexLevel+1]){
            indexLevel++;
        }
        clearCanvas();
        drawLevel(Object.values(Levels)[indexLevel]);
    }
    drawLevel(Object.values(Levels)[0]);
    document.getElementById("next").onclick = function() {nextLevel()};
    document.getElementById("start").onclick = function() {};
    document.getElementById("pause").onclick = function() {};
    document.getElementById("reset").onclick = function() {};
};    
