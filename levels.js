export class Levels{
   constructor(){
this.level1=
[[3 , 3 , 3 , 3 , 3 , 3 , 1 , 3 , 3 , 3],
 [3 , 0 , 0 , 0 , 0 , 0 , 2 , 0 , 0 , 3],
 [3 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 3],
 [3 , 0 ,r(), 0 , 0 , 0 ,r(), 0 , 0 , 3],
 [3 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 3],
 [3 , 0 ,r(), 0 , 0 , 0 ,r(), 0 , 0 , 3],
 [3 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 3],
 [1 , 0 , 0 , 0 , 0 , 0 ,r(), 0 , 0 , 3],
 [3 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 3],
 [3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3]],

 this.level2=
 [[3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3],
  [3 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 3],
  [3 , 0 ,r(), 0 , 0 ,r(), 0 , 0 , 0 , 3],
  [3 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 3],
  [3 , 0 , 0 , 0 , 0 ,r(), 0 , 0 , 2 , 1],
  [3 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 3],
  [3 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 3],
  [3 , 0 ,r(), 0 , 0 , 0 , 0 ,r(), 0 , 3],
  [3 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 3],
  [3 , 3 , 3 , 3 , 3 , 3 , 3 , 1 , 3 , 3]],

  this.level3=
  [[2 , 2 , 2 , 0 , 0 , 0 , 0 , 0 , 0 , 0],
   [2 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0],
   [2 , 2 , 2 , 0 , 2 , 0 , 0 , 0 , 0 , 0],
   [2 , 0 , 0 , 0 , 2 , 0 , 0 , 0 , 0 , 0],
   [2 , 0 , 0 , 0 , 2 , 0 , 0 , 0 , 0 , 0],
   [0 , 0 , 0 , 0 , 2 , 0 , 0 , 0 , 0 , 0],
   [0 , 0 , 0 , 0 , 2 , 0 , 2 , 0 , 0 , 2],
   [0 , 0 , 0 , 0 , 0 , 0 , 2 , 2 , 0 , 2],
   [0 , 0 , 0 , 0 , 0 , 0 , 2 , 0 , 2 , 2],
   [0 , 0 , 0 , 0 , 0 , 0 , 2 , 0 , 0 , 2]] 
   }    
};
function r(num=4){
   return Math.round(Math.random()+num)
}