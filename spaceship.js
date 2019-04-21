export class Spaceship{
    constructor(){
         this.spaceship=document.getElementById("spaceship");;
    }
create(ctx,x,y){
    ctx.drawImage(spaceship,x,y,60,60);
    }
}
