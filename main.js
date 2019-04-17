
window.onload = function() {
    let canvas = document.getElementById('mirrorBreakLazer');
    let ctx = canvas.getContext('2d');
    let img = document.getElementById("spaceship");
    ctx.drawImage(img,60,0,60,60);
    let img2 = document.getElementById("obliquelineleft");
    ctx.drawImage(img2,0,0,60,60);
};    
