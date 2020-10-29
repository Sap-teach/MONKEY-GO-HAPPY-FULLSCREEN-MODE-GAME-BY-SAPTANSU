var PLAY=1;
var END = 0;
var gameState=1;
var monkey , monkey_running, monkey_stop;
var gameOverImage,gameOver;
var banana ,bananaImage,appleImage,apple,orange, orangeImage,obstacle, obstacleImage
var bananaGroup, obstacleGroup,appleGroup,orangeGroup;
var survivalTime=0;
var score=0;
var ground,groundImage;
var invisibleGround;
var bg0,backgroundImg;


function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
    backgroundImg=loadImage("jungle.jpg");
  gameOverImage=loadImage("gameOver1.png");
  bananaImage = loadImage("banana.png");
  appleImage=loadImage("apple.png");
  orangeImage=loadImage("Orange-PNG-Clipart.png")
  obstacleImage = loadImage("obstacle.png");
  groundImage=loadImage("18b4ac88-ad8b-4d53-8307-c6cf59e6e7cf.png");
  monkey_stop=loadAnimation("050906ad-6e73-4d97-8b58-b0f882962fd8.png")

}



function setup() {
  createCanvas(1366,768);
    
  //for background
  bg0=createSprite(550,250,600,600);
  bg0.addImage("bg0",backgroundImg);
  bg0.scale=2.8;
  bg0.velocityX=-(6+(score/5));
  
  //for group
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  appleGroup=createGroup();
  orangeGroup=createGroup();
  //for monkey
  monkey=createSprite(75,688,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.addAnimation("stop",monkey_stop)
  monkey.scale=0.2;
  
  
  //for ground
  ground = createSprite(683,7180,1400,10);
  ground.velocityX=-(6+(score/5));
  ground.x=ground.width/2;
  ground.addImage(groundImage)
  console.log(ground.x);
  invisibleGround = createSprite(683,728,1400,10);
  invisibleGround.visible = false;
  ground.visible=false;
 
  //for gameOver
  gameOver=createSprite(683,348,20,20);
  gameOver.addImage("gameOverImg",gameOverImage);
  gameOver.scale=0.2;
  gameOver.visible=false;
  
  //for reducing collision radius
  monkey.setCollider("rectangle",0,0,300,560);
  monkey.debug=true;
  //console.log(monkey.height);
  console.log(monkey.y);
}


function draw() {
background(0);
 
  
  if(gameState===PLAY){
  
  //for resetting
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    
//for background
    if (bg0.x < 0){
      bg0.x = bg0.width/2;
    }
    
    //for survival time
    survivalTime=Math.ceil(frameCount/frameRate());
    
    
   //for making monkey jump
    if(keyDown("UP_ARROW")&& monkey.y>=630){
      monkey.velocityY=-28;
    }
    //add gravity
    monkey.velocityY = monkey.velocityY + 1;
    
    //for spawning
    spawnBanana();
    spawnObstacles();
    spawnApple();
    spawnOrange();
    
    
    
    //for hungry monkey's food(banana)
    if(bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
      score=score+1;
    }
    
    //for hungry monkey's food(apple)
    if(appleGroup.isTouching(monkey)){
      appleGroup.destroyEach();
      score=score+2;
    }
    
    //for hungry monkey's food(orange)
    if(orangeGroup.isTouching(monkey)){
      orangeGroup.destroyEach();
      score=score+3;
    }
    
    //for scaling
    if (score % 10 === 0){
    switch(score) {
      case 10: monkey.scale=0.25;
              break;
      case 20: monkey.scale=0.26;
              break;
      case 30:monkey.scale=0.28;
              break;
      case 40: monkey.scale=0.29;
              break;
      case 50: monkey.scale=0.3;
              break;
      case 60: monkey.scale=0.31;
              break;
      case 70: monkey.scale=0.35;
            break;
      case 80: monkey.scale=0.36;
              break;
      case 90:monkey.scale=0.39;
              break;
      case 100: monkey.scale=0.4;
              break;
      case 110: monkey.scale=0.41;
              break;
      case 120: monkey.scale=0.43;
              break;
      case 130: monkey.scale=0.435;
              break;
      case 140: monkey.scale=0.44;
              break;
      case 150: monkey.scale=0.445;
              break;
      case 160: monkey.scale=0.45;
              break;
      case 170: monkey.scale=0.455;
              break;
      case 180: monkey.scale=0.46;
              break;
      case 190: monkey.scale=0.465;
              break;
      case 200: monkey.scale=0.47;
              break;
      case 210: monkey.scale=0.475;
              break;
      default: break;
}
    }
    
    //for touching obstacles 
     if(obstacleGroup.isTouching(monkey)){
       gameState=END;
       monkey.velocityY=0;
        
    }
    
    //for scaling the monkey up
}else if(gameState===END){
  ground.velocityX=0;
  bg0.velocityX=0;
  obstacleGroup.setVelocityXEach(0);
  bananaGroup.setVelocityXEach(0);
  obstacleGroup.setLifetimeEach(-1);
  bananaGroup.setLifetimeEach(-1);
  monkey.changeAnimation("stop",monkey_stop);
  gameOver.visible=true;
  appleGroup.setVelocityXEach(0);
  appleGroup.setLifetimeEach(-1);
  orangeGroup.setVelocityXEach(0);
  orangeGroup.setLifetimeEach(-1);
  }
  
  //for colliding monkey
  monkey.collide(invisibleGround);
 
  drawSprites();
  //for survival time
  stroke(254, 141, 119);
  textSize(30);
  fill(0);
  text("Survival Time:"+survivalTime,10,50);
  
  //for hungerLevel
  stroke(0);
  textSize(20);
  fill(254, 141, 119);
  text("SCORE:"+score,1226,20);
 
  if(survivalTime<20&&gameState===PLAY){
     fill(0);
     stroke(0);
     textSize(20);
     text("PRESS UP ARROW KEY TO JUMP..AND PRESS F11 & VIEW THE PAGE IN 100% ZOOM", 50,100);
  }

}
  


//function for spawning banana
function spawnBanana(){
  if(frameCount%117===0){ 
    banana=createSprite(1366,300,20,20);
    banana.addImage(bananaImage);
    banana.y=Math.round(random(189,688));
    banana.velocityX=-7;
    banana.lifetime=280;
    bananaGroup.add(banana);
    banana.scale=0.2;
  }
  
}

function spawnApple(){
 if(frameCount%187===0){
  apple=createSprite(1366,300,20,20);
  apple.addImage(appleImage);
  apple.y=Math.round(random(190,668));
  apple.velocityX=-6;
  apple.lifetime=240;
  appleGroup.add(apple);
  apple.scale=0.21;
 }
}

function spawnOrange(){
 if(frameCount%267===0){
  orange=createSprite(1366,300,20,20);
  orange.addImage(orangeImage);
  orange.y=Math.round(random(220,638));
  orange.velocityX=-7;
  orange.lifetime=200;
  orangeGroup.add(orange);
  orange.scale=0.1;
 }
}
//function for spawning obstacle
function spawnObstacles(){
  if(frameCount%310===0){
    obstacle=createSprite(1366,678,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX=-(6+(score/5));
    obstacle.lifetime=285;
    obstacleGroup.add(obstacle);
    obstacle.scale=0.23;
  }
  
}





