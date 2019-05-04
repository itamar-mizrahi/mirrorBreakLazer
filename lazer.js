const lazer= new Image();
export class Lazer{
    constructor(){
        this.width=60;
        this.height=60;
    }
create(ctx,x,y,speed){ 
    ctx.fillStyle = `rgba(255,0,0,${speed/100})`;
    ctx.fillRect(x,y,this.width,this.height);  
    }
}