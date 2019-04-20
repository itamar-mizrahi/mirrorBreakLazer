export class Lazer{
    constructor(){
         this.lazer;
    }
create(ctx,x,y){   
    this.lazer=document.getElementById("lazer");
    ctx.drawImage(lazer,x,y,60,60);
    }
}