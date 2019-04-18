import { Moon } from './moon.js';
import { Obliquelineleft } from './obliquelineleft.js';
import { ObliquelineRight } from './obliquelineRight.js';
import { Spaceship } from './spaceship.js';
window.onload = function() {
    const x=0,y=0;
    let canvas = document.getElementById('mirrorBreakLazer');
    let ctx = canvas.getContext('2d');
    let spaceship=new Spaceship();
    spaceship.create(ctx,x,y);
    let obliquelineleft=new Obliquelineleft();
    obliquelineleft.create(ctx,x,y);
    let moon=new Moon();
    moon.create(ctx,x,y);
    let obliquelineRight=new ObliquelineRight();
    obliquelineRight.create(ctx,x,y);

   
 
};    
