let planets=['moon','jupiter','mars','earth']
let planetArr=[]
for(let i=0;i<4;i++){
planetArr[i]= new Image();
planetArr[i].src=`images/${planets[i]}.png`;
}
export class Planet{
    constructor(){
        this.width=60;
        this.height=60;   
    }
create(ctx,x,y){  
    ctx.drawImage(planetArr[r()],x,y,this.width,this.height);
    }
}
function r(){
    return Math.round(Math.random()*3);
}