
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var tree, treeImg, ground, mango1, mango2, mango3, mango4, mango5, mango6, mango7, player, playerImg, hand, stones = [], noOfStones = 10;
var engine, world;
var mangos = [mango1, mango2, mango3, mango4, mango5, mango6, mango7];

function preload(){
  
  treeImg = loadImage("tree.png");
  playerImg = loadImage("player.png");


}

function setup() {
  createCanvas(1000,700);

  engine = Engine.create();
  world = engine.world;

  angleMode(DEGREES);


  mango1 = new Mango(280, 170, 60, 60);
  mango2 = new Mango(320, 220, 60, 60);
  mango3 = new Mango(260, 270, 60, 60);
  mango4 = new Mango(350, 270, 60, 60);
  mango5 = new Mango(330, 330, 60, 60);
  mango6 = new Mango(280, 380, 60, 60);
  mango7 = new Mango(400, 350, 60, 60);


  var options = {
    isStatic: true
  };

  tree = Bodies.rectangle(100, 120, 400, 600, options);
  World.add(world, tree);

  player = Bodies.rectangle(770, 430, 90, 280, options);
  World.add(world, player);


  ground = new Ground(500, 700, width, 20);

  hand = new Playerhand(778, 520, 30, 80);


}


function draw() 
{
  background("lightgreen");
  Engine.update(engine);

  image(treeImg,tree.position.x,tree.position.y,400,600);
  image(playerImg,player.position.x,player.position.y,90,280);



  mango1.display();
  mango2.display();
  mango3.display();
  mango4.display();
  mango5.display();
  mango6.display();
  mango7.display();


  ground.show();
  hand.display();

  fill("#FFFF");
  textAlign("center");
  textSize(30);
  text("Remaining Stones : " + noOfStones, 200, 100);

  if (noOfStones == 0) {
    text("Stone bucket is empty", 200 , 200);
  }

  for(i = 0; i < stones.length; i++){
    stones[i].display();
    detectollision(stones[i],mango1);
    detectollision(stones[i],mango2);
    detectollision(stones[i],mango3);
    detectollision(stones[i],mango4);
    detectollision(stones[i],mango5);
    detectollision(stones[i],mango6);
    detectollision(stones[i],mango7);

  }
 
  
  //drawSprites();
}


function detectollision(lstone,lmango){

  mangoBodyPosition=lmango.body.position
  stoneBodyPosition=lstone.body.position
  
  var distance=dist(stoneBodyPosition.x, stoneBodyPosition.y, mangoBodyPosition.x, mangoBodyPosition.y)
  	if(distance<=80)
    {
  	  Matter.Body.setStatic(lmango.body,false);
    }

  }


function keyPressed() {
  if (keyCode === 32) {
    if (noOfStones > 0) {
      var positionX = hand.body.position.x;
      var positionY = hand.body.position.y;
      var angle = hand.body.angle;

      var stone = new Stone(positionX, positionY, 20, 20, angle);
      stones.push(stone);
      stone.trajectory = [];
      Matter.Body.setAngle(stone.body, angle);
      noOfStones -= 1;
    }
  }
}


function keyReleased() {
  if (keyCode === 32) {
    if (stones.length) {
      var angle = hand.body.angle;
      stones[stones.length - 1].shoot(angle);
    }
  }
}
