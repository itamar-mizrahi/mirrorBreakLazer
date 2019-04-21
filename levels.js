export class Levels{
   constructor(){
this.level1=
[[0,0,0,0,0,0,1,0,0,0],
 [0,3,3,3,3,3,2,3,3,0],
 [0,3,0,0,0,0,0,0,3,0],
 [0,3,4,0,0,0,4,0,3,0],
 [0,3,0,0,0,0,0,0,3,0],
 [0,3,5,0,0,0,5,0,3,0],
 [0,3,0,0,0,0,0,0,3,0],
 [1,0,0,0,0,0,4,0,3,0],
 [0,3,3,3,3,3,3,3,3,0],
 [0,0,0,0,0,0,0,0,0,0]],

 this.level2=
 [[0,0,0,0,0,0,0,0,0,0],
  [0,3,3,3,3,3,3,3,3,0],
  [0,3,4,0,0,5,0,0,3,0],
  [0,3,0,0,0,0,0,0,3,0],
  [0,3,0,0,0,5,0,0,2,1],
  [0,3,0,0,0,0,0,0,3,0],
  [0,3,0,0,0,0,0,0,3,0],
  [0,3,5,0,0,0,0,5,3,0],
  [0,3,3,3,3,3,3,0,3,0],
  [0,0,0,0,0,0,0,1,0,0]],

  this.level3=
  [[2,2,2,0,0,0,0,0,0,0],
   [2,0,0,0,0,0,0,0,0,0],
   [2,2,2,0,2,0,0,0,0,0],
   [2,0,0,0,2,0,0,0,0,0],
   [2,0,0,0,2,0,0,0,0,0],
   [0,0,0,0,2,0,0,0,0,0],
   [0,0,0,0,2,0,5,0,0,2],
   [0,0,0,0,0,0,2,5,0,2],
   [0,0,0,0,0,0,2,0,5,2],
   [0,0,0,0,0,0,2,0,0,5]] 
   }
   
   /*drawLevel() {
      let lazerObject=new Lazer();
      let spaceshipObject=new Spaceship();
      let moonObject=new Moon();
      let obliquelineleftObject=new Obliquelineleft();
      let obliquelineRightObject=new ObliquelineRight();
      for (let i=0; i<this.level1.length; i++){
          for (let j=0; j<this.level1[i].length; j++){  
               if(this.level1[i][j]===1){
                  spaceshipObject.create(ctx,j*x,i*y);
              }else if(this.level1[i][j]===2){
                  lazerObject.create(ctx,j*x,i*y);
                  lazerCor[0]=j*x;
                  lazerCor[1]=i*y;
              }
              else if(this.level1[i][j]===3){
                  moonObject.create(ctx,j*x,i*y); 
              }
              else if(this.level1[i][j]===4){
                  obliquelineleftObject.create(ctx,j*x,i*y); 
              }
              else if(this.level1[i][j]===5){
                  obliquelineRightObject.create(ctx,j*x,i*y); 
              }
          }
      } 
  }
  */
};

