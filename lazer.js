export class Lazer{
    constructor(){
         this.lazer=document.getElementById("lazer");
    }
create(ctx,x,y){   
    ctx.drawImage(this.lazer,x,y,60,60);
    }
}