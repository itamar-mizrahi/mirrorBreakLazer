window.onload = function() {
    const x=60;
    let canvas = document.getElementById('mirrorBreakLazer');
    let ctx = canvas.getContext('2d');
    let obliquelineleft = document.getElementById("obliquelineleft");
    ctx.drawImage(obliquelineleft,0*x,0,60,60);
    let obliquelineRight = document.getElementById("obliquelineRight");
    ctx.drawImage(obliquelineRight,1*x,0,60,60);
    let spaceship = document.getElementById("spaceship");
    ctx.drawImage(spaceship,2*x,0,60,60);
    let moon = document.getElementById("moon");
    ctx.drawImage(moon,3*x,0,60,60);
 
};    
