export class Moon{
    constructor(){
         this.moon=document.getElementById("moon");
    }
create(ctx,x,y){   
    ctx.drawImage(moon,x,y,60,60);
    }
}