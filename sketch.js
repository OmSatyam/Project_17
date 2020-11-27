
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivalTime = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
 
  createCanvas(600,400);
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
 // console.log(ground.x);
  
  obstacleGroup = new Group();
  foodGroup = new Group();
  
}


function draw() {
  background("white");
console.log(ground.x);
 // Survival time
   stroke("black");
   textSize(20);
   fill("black");
   text("SurvivalTime:"+ survivalTime, 100,50);
   survivalTime = Math.ceil(frameCount/frameRate());
  
 if (gameState === PLAY){
   
   // making the ground unlimited 
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
   
  // jump when the SPACE key is pressed
  if(keyDown("space")&& monkey.y >= 310){
    monkey.velocityY = -15;
  }
  //added gravity
   monkey.velocityY = monkey.velocityY + 0.8

 SpawnObstacle();
  
  SpawnBanana();
  // making the monkey collide with the ground
   monkey.collide(ground);
  
  
   
  if(monkey.isTouching(obstacleGroup)){
    gameState = END;
     }
 }

  else if(gameState === END ){
    ground.velocityX = 0;
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
     
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);  
  } 
  
  // drawing sprites
  drawSprites();
}

function SpawnObstacle(){
  if (frameCount % 300 === 0){
  var  obstacle = createSprite(400,330,20,20);
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.1;
  obstacle.velocityX = -4;
  obstacle.lifetime = 100;
  obstacleGroup.add(obstacle);
  }
}

function SpawnBanana(){
  if(frameCount % 80 === 0){
  var banana = createSprite(400,100,20,20);
  banana.velocityX = -8;
  banana.y = Math.round(random(120,200));
  banana.addImage(bananaImage);
  banana.scale = 0.1;
  banana.lifetime = 50;
  foodGroup.add(banana);
  }
}


