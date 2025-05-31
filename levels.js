let levelArr=[
   [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
   [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 3 ],
   [ 3 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
   [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 3 ],
   [ 3 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
   [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
   [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 3 ],
   [ 3 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
   [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
   [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ]] ;
   let randomNumber=Math.round(Math.random()*7+1);
   let randomNumber2=Math.round(Math.random()*7+1);

   export class Levels{
   constructor(){
      this.level1=this.levelCreator(1);
      this.level2=this.levelCreator(2);
      this.level3=this.levelCreator(3);
      this.level4=this.levelCreator(4);
      // Levels 5-8 temporarily disabled due to game logic issues:
      // Level 5: Creates text art instead of playable level
      // Levels 6-8: Don't follow core mechanic (need 2 spaceships to hit)
      // this.level5=this.levelCreator(5);
      // this.level6=this.levelCreator(6);
      // this.level7=this.levelCreator(7);
      // this.level8=this.levelCreator(8);
   }
   levelCreator(level){
      if(level==1){
         levelArr[0][randomNumber]=1;
         levelArr[1][randomNumber]=2;
            for (let i=2;i<levelArr.length-1;i+=Math.round(Math.random()*2+1)){
               if (i!=2) {
                  randomNumber=randomNumber2;
               }
               levelArr[i][randomNumber]=r();
               randomNumber2=Math.round(Math.random()*7+1);
               while (randomNumber===randomNumber2){
                     randomNumber2=Math.round(Math.random()*7+1);
                  }
               levelArr[i][randomNumber2]=r();
               
            }
            levelArr[levelArr.length-1][randomNumber2]=1;
      }
      if(level==2){
         levelArr=[
            [ 0 , 0 , 0 , 0 , 3 ,r(), 0 ,r(), 0 , 0 ],
            [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 3 , 0 , 0 ],
            [ 0 , 0 ,r(), 3 , 0 ,r(), 0 ,r(), 0 , 0 ],
            [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
            [ 0 , 0 , 3 , 0 , 0 ,r(), 0 , 0 , 2 , 1 ],
            [ 3 , 0 , 0 , 0 , 0 , 3 , 0 , 0 , 0 , 0 ],
            [ 0 , 0 ,r(), 0 , 0 , 0 , 0 , 0 , 0 , 1 ],
            [ 0 , 0 ,r(), 0 , 0 , 0 , 0 ,r(), 0 , 0 ],
            [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
            [ 0 , 3 , 0 , 0 , 0 , 0 , 3 , 0 , 0 , 0 ]]
      }
      if (level==3){
         levelArr=[
            [ 3 , 3 , 3 , 3 , 3 , 3 , 3 , 1 , 3 , 3 ],
            [ 3 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 3 ],
            [ 3 ,r(),r(), 0 ,r(), 0 , 0 , 0 , 0 , 3 ],
            [ 3 , 0 , 0 , 0 , 0 , 0 , 0 ,r(),r(), 3 ],
            [ 1 , 2 ,r(), 0 , 0 , 0 , 0 ,r(),r(), 3 ],
            [ 3 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 3 ],
            [ 3 ,r(), 0 ,r(), 0 , 0 , 0 , 0 , 0 , 3 ],
            [ 3 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 3 ],
            [ 3 , 0 , 0 ,r(),r(), 0 , 0 ,r(), 0 , 3 ],
            [ 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 ]]
      }
      if (level==4){
         levelArr=[
            [ 0 , 0 , 0 , 3 , 0 , 0 , 1 , 0 , 0 , 0 ],
            [ 0 , 0 , 3 , 0 , 3 , 0 , 2 , 0 , 0 , 0 ],
            [ 0 ,r(), 0 , 0 , 0 , 0 , 0 , 0 , 0 ,r()],
            [ 0 , 0 ,r(), 0 , 3 , 0 ,r(), 0 ,r(), 0 ],
            [ 0 ,r(), 0 , 0 ,r(), 0 , 0 , 0 , 0 , 0 ],
            [ 0 , 0 ,r(), 0 , 0 , 0 ,r(), 0 ,r(), 3 ],
            [ 0 , 0 , 0 , 0 ,r(), 0 , 0 , 0 , 0 , 0 ],
            [ 1 , 0 , 0 , 0 , 0 , 0 ,r(), 0 ,r(), 0 ],
            [ 0 , 0 , 3 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
            [ 0 , 0 , 0 , 0 , 3 , 0 , 0 , 0 , 0 , 0 ]]
      }
      /*
      // DISABLED LEVELS - Need redesign to follow core game mechanic
      if (level==5){
         levelArr=[
            [ 2 , 2 , 2 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
            [ 2 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
            [ 2 , 2 , 2 , 0 , 2 , 0 , 0 , 0 , 0 , 0 ],
            [ 2 , 0 , 0 , 0 , 2 , 0 , 0 , 0 , 0 , 0 ],
            [ 2 , 0 , 0 , 0 , 2 , 0 , 0 , 0 , 0 , 0 ],
            [ 0 , 0 , 0 , 0 , 2 , 0 , 0 , 0 , 0 , 0 ],
            [ 0 , 0 , 0 , 0 , 2 , 0 , 2 , 0 , 0 , 2 ],
            [ 0 , 0 , 0 , 0 , 0 , 0 , 2 , 2 , 0 , 2 ],
            [ 0 , 0 , 0 , 0 , 0 , 0 , 2 , 0 , 2 , 2 ],
            [ 0 , 0 , 0 , 0 , 0 , 0 , 2 , 0 , 0 , 2 ]] 
      }
      
      // NEW CHALLENGING LEVELS
      if (level==6){
         levelArr=[
            [ 0 , 3 , 0 , 0 , 2 , 0 , 0 , 3 , 0 , 1 ],
            [ r(), 0 , 0 , r(), 0 , r(), 0 , 0 , 3 , 0 ],
            [ 0 , 0 , 3 , 0 , 0 , 0 , 3 , 0 , 0 , r()],
            [ 3 , r(), 0 , 0 , r(), 0 , 0 , r(), 0 , 0 ],
            [ 0 , 0 , 0 , 3 , 0 , 3 , 0 , 0 , 0 , 3 ],
            [ r(), 0 , r(), 0 , 0 , 0 , r(), 0 , r(), 0 ],
            [ 0 , 3 , 0 , 0 , r(), 0 , 0 , 3 , 0 , 0 ],
            [ 0 , 0 , r(), 0 , 0 , 0 , r(), 0 , 0 , 3 ],
            [ 3 , 0 , 0 , r(), 0 , r(), 0 , 0 , r(), 0 ],
            [ 1 , 0 , 3 , 0 , 0 , 0 , 3 , 0 , 0 , 0 ]]
      }
      
      if (level==7){
         levelArr=[
            [ 3 , 3 , 3 , 1 , 3 , 3 , 3 , 3 , 3 , 3 ],
            [ 3 , r(), 0 , 0 , 0 , 0 , 0 , r(), 0 , 3 ],
            [ 3 , 0 , 3 , r(), 0 , 0 , r(), 3 , 0 , 3 ],
            [ 3 , r(), 0 , 0 , r(), r(), 0 , 0 , r(), 3 ],
            [ 3 , 0 , 0 , r(), 0 , 0 , r(), 0 , 0 , 3 ],
            [ 3 , 0 , r(), 0 , 0 , 0 , 0 , r(), 0 , 3 ],
            [ 3 , r(), 0 , 0 , r(), r(), 0 , 0 , r(), 3 ],
            [ 3 , 0 , 3 , r(), 0 , 0 , r(), 3 , 0 , 3 ],
            [ 3 , 0 , 0 , 0 , 2 , 0 , 0 , 0 , 0 , 3 ],
            [ 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 ]]
      }
      
      if (level==8){
         levelArr=[
            [ 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 ],
            [ 0 , r(), 3 , 0 , 0 , 0 , 3 , r(), 0 , 0 ],
            [ 0 , 3 , r(), 0 , 2 , 0 , r(), 3 , 0 , 0 ],
            [ 0 , 0 , 0 , r(), 0 , r(), 0 , 0 , 0 , 0 ],
            [ 0 , 0 , 0 , 0 , r(), 0 , 0 , 0 , 0 , 0 ],
            [ 0 , 0 , 0 , r(), 0 , r(), 0 , 0 , 0 , 0 ],
            [ 0 , 3 , r(), 0 , 0 , 0 , r(), 3 , 0 , 0 ],
            [ 0 , r(), 3 , 0 , 0 , 0 , 3 , r(), 0 , 0 ],
            [ 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 ],
            [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ]]
      }
      */

      return levelArr;
   }  
};
function r(num=4){
   return Math.round(Math.random()) + num;
}

/*                  try{
                     if(levelArr[i+1][randomNumber2+1] <4)
                     levelArr[i+1][randomNumber2+1]=3;
                     if(levelArr[i-1][randomNumber2-1] <4)
                     levelArr[i-1][randomNumber2-1]=3;
                  }
                  finally{
                     continue;
                  }
    
                  const flipMatrix = matrix => (
      matrix[0].map((column, index) => (
        matrix.map(row => row[index])
      ))
    );
   
*/