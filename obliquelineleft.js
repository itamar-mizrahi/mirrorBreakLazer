const obliquelineleft= new Image();
obliquelineleft.src="images/obliquelineleft.png";
export class Obliquelineleft{
    constructor(){
        this.width=60;
        this.height=60;
    }
create(ctx,x,y){   
    ctx.drawImage(obliquelineleft,x,y,this.width,this.height);
    }
}