const spaceship = new Image();
let imageLoaded = false;

spaceship.onload = function() {
    imageLoaded = true;
};
spaceship.src = "images/spaceship.png";

export class Spaceship {
    constructor() {
        this.width = 60;
        this.height = 60;   
    }
    
    create(ctx, x, y) {
        if (imageLoaded) {
            ctx.drawImage(spaceship, x, y, this.width, this.height);
        } else {
            // Draw a temporary rectangle if image isn't loaded yet
            ctx.fillStyle = "#4CAF50";
            ctx.fillRect(x, y, this.width, this.height);
            ctx.strokeStyle = "#000";
            ctx.strokeRect(x, y, this.width, this.height);
            // Draw a simple spaceship shape
            ctx.fillStyle = "#fff";
            ctx.font = "12px Arial";
            ctx.textAlign = "center";
            ctx.fillText("🚀", x + this.width/2, y + this.height/2);
        }
    }
}
