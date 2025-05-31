let planets = ['moon', 'jupiter', 'mars', 'earth'];
let planetArr = [];
let imagesLoaded = 0;

for (let i = 0; i < 4; i++) {
    planetArr[i] = new Image();
    planetArr[i].onload = function() {
        imagesLoaded++;
    };
    planetArr[i].src = `images/${planets[i]}.png`;
}

export class Planet {
    constructor() {
        this.width = 60;
        this.height = 60;   
    }
    
    create(ctx, x, y) {
        if (imagesLoaded > 0) {
            // Use a loaded image, or fallback to first available
            let imageIndex = r();
            if (planetArr[imageIndex].complete && planetArr[imageIndex].naturalHeight !== 0) {
                ctx.drawImage(planetArr[imageIndex], x, y, this.width, this.height);
            } else {
                // Find first loaded image
                for (let i = 0; i < planetArr.length; i++) {
                    if (planetArr[i].complete && planetArr[i].naturalHeight !== 0) {
                        ctx.drawImage(planetArr[i], x, y, this.width, this.height);
                        return;
                    }
                }
                // If no images loaded, draw placeholder
                this.drawPlaceholder(ctx, x, y);
            }
        } else {
            this.drawPlaceholder(ctx, x, y);
        }
    }
    
    drawPlaceholder(ctx, x, y) {
        ctx.fillStyle = "#8B4513";
        ctx.beginPath();
        ctx.arc(x + this.width/2, y + this.height/2, this.width/2 - 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.strokeStyle = "#000";
        ctx.stroke();
    }
}

function r() {
    return Math.round(Math.random() * 3);
}