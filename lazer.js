export class Lazer{
    constructor(){
        this.width=60;
        this.height=60;  
    }
create(ctx,x,y,opacity){ 
    
    ctx.fillStyle = `rgba(${r()},${r(128)},${r(128)},${opacity/100})`;
    ctx.fillRect(x,y,this.width,this.height);  
    }
}
function r(num=255){
     return Math.round(Math.random()*num)
}