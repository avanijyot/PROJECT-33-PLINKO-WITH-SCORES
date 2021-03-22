//physics engine
const Engine = Matter.Engine;
const World = Matter.World;
const Events = Matter.Events;
const Bodies = Matter.Bodies;
 
// to create the sprite objects
var engine, world;
var particles = [];
var plinkos = [];
var divisions = [];
var particle;
var score = 0;
var count = 0;
var divisionHeight = 300;
var gameState = "start";

function setup() {

  //to create the canvas
  createCanvas(800, 800);

  //to create the engine and world
  engine = Engine.create();
  world = engine.world;

  //to run the engine
  Engine.run(engine);

  //to create the game objects
  ground = new Ground(width/2, height, width, 20);

    for (var k = 0; k <=width; k = k + 80) {

       divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));

    }

    for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75));

    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));

    }

     for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));

    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375));

    }
   
}

function draw() {

  //to give the background
  background("black");

  //to display the score and the count 
  textSize(20);
  text("Score : "+ score, 20, 30);
  text("You have 5 turns to maximise your score.", 410, 30);

  //to display the scores
  textSize(20);
  text("500", 20, 520);
  text("500", 100, 520);
  text("500", 180, 520);
  text("500", 260, 520);
  text("100", 340, 520);
  text("100", 420, 520);
  text("100", 500, 520);
  text("200", 580, 520);
  text("200", 660, 520);
  text("200", 740, 520);

  //to update the engine
  Engine.update(engine);
  
  //to display the ground

  ground.display();

  //to end the game 
  if(gameState === "end"){

    textSize(90);
    fill("red");
    text("GameOver", 150, 460);

   }

   //to display the plinkos
   for (var i = 0; i < plinkos.length; i++) {
     
     plinkos[i].display();
     
   }

   //to display the particles
   if(particle!=null)
   {
      particle.display();
       
       if (particle.body.position.y > 760)
       {
             if (particle.body.position.x < 300) 
             {
                 score = score + 500;      
                 particle = null;

                 if ( count >= 5) gameState = "end";                          
             }


             else if (particle.body.position.x < 600 && particle.body.position.x > 301 ) 
             {
                   score = score + 100;
                   particle = null;

                   if ( count>= 5) gameState = "end";

             }
             else if (particle.body.position.x < 900 && particle.body.position.x > 601 )
             {
                   score = score + 200;
                   particle = null;

                   if ( count>= 5)  gameState = "end";

             }      
             
       }
 
     }

     //to display the divisions
   for (var k = 0; k < divisions.length; k++) {
     
     divisions[k].display();

   }

   //to restart the game
   if(count === 5 && gameState === "end" && keyCode === 32){

     gameState = "start";
     count = 0;
     score = 0;

   }

}

function mousePressed(){

  if(gameState !== "end"){

    count++;
    particle = new Particle(mouseX, 10, 10, 10);

  }

}