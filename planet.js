let planets=['moon','jupiter','mars','earth']
const planet= new Image();
planet.src=`images/${planets[Math.round(Math.random()*3)]}.png`;
export class Planet{
    constructor(){
        this.width=60;
        this.height=60;   
    }
create(ctx,x,y){  
    ctx.drawImage(planet,x,y,this.width,this.height);
    }
}
