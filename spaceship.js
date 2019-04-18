export class Spaceship{
    constructor(){
         this.spaceship;
    }
create(ctx,x,y){   
    this.spaceship=document.getElementById("spaceship");
    ctx.drawImage(spaceship,x,y,60,60);
    }
}
