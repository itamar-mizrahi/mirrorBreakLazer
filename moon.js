export class Moon{
    constructor(){
         this.moon;
    }
create(ctx,x,y){   
    this.moon=document.getElementById("moon");
    ctx.drawImage(moon,x,y,60,60);
    }
}