const spaceship= new Image();
spaceship.src="images/spaceship.png";
export class Spaceship{
    constructor(){
        this.width=60;
        this.height=60;   
    }
create(ctx,x,y){
    ctx.drawImage(spaceship,x,y,this.width,this.height);
    }
}
