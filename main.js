
window.onload = function() {
    let canvas = document.getElementById("mirrorBreakLazer");
    let ctx = canvas.getContext("2d");
    ctx.fillStyle='black';
    ctx.fillRect(0,0,10,10);
    let img = document.getElementById("spaceship");
    ctx.drawImage(img, 10, 10);

};    