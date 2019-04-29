const obliquelineRight= new Image();
obliquelineRight.src="images/obliquelineRight.png";
export class ObliquelineRight{
    constructor(){
        this.width=60;
        this.height=60;
    }
create(ctx,x,y){   
    ctx.drawImage(obliquelineRight,x,y,this.width,this.height);
    }
}