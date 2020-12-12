var ghost,ghostImg,climber,climberImg;
var door,doorImg,ghost_jumping,tower,towerImg,doorsGroup;
var sound;
var PLAY=1;
var END=0;
var gameState=PLAY;

function preload(){
 ghostImg= loadImage("ghost-standing.png"); 
 ghost_jumping=loadImage("ghost-jumping.png");
 climberImg=loadImage("climber.png");
  doorImg=loadImage("door.png");
 towerImg=loadImage("tower.png");
 sound=loadSound("spooky.wav"); 
}

function setup(){
  createCanvas(600,600);
  sound.play();
  tower=createSprite(300,300,600,600);
  tower.addImage(towerImg);
  
  doorsGroup=new Group();
  climbersGroup = new Group();
  ghost = createSprite(300,300);
  ghost.addImage(ghostImg);
  ghost.scale=0.3;
  
}
function draw(){
 clear();
  
  if(gameState===PLAY){
    tower.velocityY=3;
    
  if(tower.y>400){
    tower.y=300;
  }
  spawnDoors();
     if(keyDown("left_arrow")){
     ghost.x=ghost.x-2;
     }
   if(keyDown("right_arrow")){
     ghost.x=ghost.x+2;
     }
 
  if(keyDown("space")){
    ghost.velocityY=-5;
    
    
  }
   ghost.velocityY=ghost.velocityY+0.8;
    
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY=0;
    ghost.addImage(ghost_jumping);
  }
  else{
    ghost.addImage(ghostImg)        
  }
    
  if(ghost.y>600){
    gameState=END
  }
  }
  else if(gameState===END){
    ghost.destroy();
    textSize(30);
    fill("yellow");
    text("GAME OVER",250,300);
  
  }
  
  drawSprites();
  
}

function spawnDoors(){
  if(frameCount%240==0){
    door=createSprite(200,0,20,20);
    climber=createSprite(0,0);
    door.addImage(doorImg);
    climber.addImage(climberImg);
    door.x= Math.round(random(120,500));
    climber.x=door.x;
    climber.y=door.y+50;
    climber.scale=0.7;
    door.velocityY=3;
    climber.velocityY=3;
    door.lifetime=800;
    climber.lifetime=800;
    doorsGroup.add(door);
    climbersGroup.add(climber);
    door.depth=ghost.depth;
    ghost.depth=ghost.depth+1;
  }
  
  
}