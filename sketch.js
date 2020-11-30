var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var score = 0;
var ground

function preload(){ 
monkey_running = new Animation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  monkey = createSprite(50, 300, 30, 30);
  monkey.scale = 0.1;
  
  monkey.addAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  ground = createSprite(200, 350, 400, 40);
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
}

function draw() {
  background(255);
  
  monkey.velocityY = monkey.velocityY + 1;
  monkey.collide(ground);
  if(monkey.y >= 290 && keyDown("space")){
    monkey.velocityY = -15;
  }
  
  text("Score " + score, 350, 20);
  
  drawSprites();
  spawnBananas();
}

function spawnBananas(){
  if(frameCount%80 === 0){
    banana = createSprite(500, random(300,200));
    banana.addImage(bananaImage);
    banana.velocityX = -3;
    banana.scale = 0.1;
    banana.lifetime = 200;
    bananaGroup.add(banana);
  }
  if(bananaGroup.isTouching(monkey)){
    score = score + 1;
    bananaGroup.destroyEach();
  }
}

function spawnObstacles(){
  if(frameCount%300 === 0){
    obstacle = createSprite(500, random(300,200));
    obstacle.addImage(bananaImage);
    obstacle.velocityX = -3;
    obstacle.scale = 1;
    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle);
  }
  if(obstacleGroup.isTouching(monkey)){
    score = score + 1;
    monkey.destroy();
    bananaGroup.destroyEach();
    monkey.destroy();
  }
}