const moon= new Image();
moon.src="images/moon.png";
export class Moon{
    constructor(){
        this.width=60;
        this.height=60;   
    }
create(ctx,x,y){   
    ctx.drawImage(moon,x,y,this.width,this.height);
    }
}