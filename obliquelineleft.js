const obliquelineleft = new Image();
let imageLoaded = false;

obliquelineleft.onload = function() {
    imageLoaded = true;
};
obliquelineleft.src = "images/obliquelineleft.png";

export class Obliquelineleft {
    constructor() {
        this.width = 60;
        this.height = 60;
    }
    
    create(ctx, x, y) {
        if (imageLoaded) {
            ctx.drawImage(obliquelineleft, x, y, this.width, this.height);
        } else {
            // Draw a temporary rectangle if image isn't loaded yet
            ctx.fillStyle = "#888";
            ctx.fillRect(x, y, this.width, this.height);
            ctx.strokeStyle = "#000";
            ctx.strokeRect(x, y, this.width, this.height);
            // Draw a diagonal line to represent the mirror
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + this.width, y + this.height);
            ctx.stroke();
        }
    }
}