const lazer= new Image();
lazer.src="images/lazer.png";
export class Lazer{
    constructor(){
        this.width=60;
        this.height=60;
    }
create(ctx,x,y){   
    ctx.drawImage(lazer,x,y,this.width,this.height); 
    }
}