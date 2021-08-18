class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car2 = createSprite(300,200);
    car3 = createSprite(500,200);
    car4 = createSprite(700,200);
    car1.addImage(car1_img)
    car2.addImage(car2_img)
    car3.addImage(car3_img)
    car4.addImage(car4_img)
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
      background("#70543e")
      image(track,0,-displayHeight*4,displayWidth,displayHeight*5);
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 0;
      var y;

      for(var index =1;index<=4;index++){
        //add 1 to the index for every loop
       // index = index + 1 ;
      var playerIndex="player"+index 
        //position the cars a little away from each other in x direction
       // x = x + 200;
       x=allPlayers[playerIndex].xPos

        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[playerIndex].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (player.index==index){
          
          cars[index - 1].shapeColor = "red";
          fill("red")
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
          text(allPlayers[playerIndex].name,cars[index-1].x,cars[index-1].y+75);
         
        }
       else{
        fill("green")
        text(allPlayers[playerIndex].name,cars[index-1].x,cars[index-1].y+75);
       
        

        cars[index - 1].shapeColor = "green";

       }
        //textSize(15);
       
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    if( player.distance>3800){
   player.rank=finishedPlayers+1
Player.updateFinishedPlayers()
player.update()
    }

    drawSprites();
  }
}
