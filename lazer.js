const lazer= new Image();
lazer.src="images/lazer.png";
export class Lazer{
    constructor(){
        this.width=20;
        this.height=20;
    }
create(ctx,x,y){   
    ctx.drawImage(lazer,x+20,y,this.width,this.height); 
    }
}