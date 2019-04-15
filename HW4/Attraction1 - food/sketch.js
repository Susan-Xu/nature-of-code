"use strict";

let pancakes = [];
let insects = [];

function setup() {
  createCanvas(700,700);
  //scale(windowHeight/600);
  for (let i = 0; i < 100; i++) {
    insects.push(new Insect(random(width), random(height)))
  }
}

function draw() {
  background(255);
  
  fill(250, 180, 90);
  textSize(75);
  textFont("Impact");
  text("Do you like ",0,65);
  text("pancake with syrup?",0,130);
  
  // visualize pancake
  for (let i = 0; i < pancakes.length; i++) {
    let p = pancakes[i];
    p.display();
  }
  
  // move and visualize insects
  for (let i = 0; i < insects.length; i++) {
    let p = insects[i];
    let force = createVector();
    let speed2 = p.vel.magSq();
    let velv = p5.Vector.mult(p.vel, -1).normalize();
    
    let eatCake = false;
    let maxForce = 0;
    let honeyCount = 0;
    let cakeA = -1; // pancake with largest attraction
    let cakeEaten = -1;
    
    // apply attraction from pancake
    for (let j = 0; j < pancakes.length; j++) {
      let pancake = pancakes[j];
      // relative position
      let relPos = new p5.Vector.sub(pancake.pos, p.pos);
      let dist = relPos.mag();
      
      // check for the largest (pancake) attraction
      let f = relPos.copy().mult(pancake.mass/(dist^3));
      if ( f.mag() > maxForce) {
        force = f.copy();
        maxForce = f.mag();
        cakeA = j;
      }
      
      
      if (dist < pancake.cake / 2) {
        // if in pancake
        eatCake = true;
        cakeEaten = j;
      }
      //if in honey
      else if (dist < pancake.honey / 2) honeyCount++;

    }
    p.applyForce(force); // pancake
    p.applyForce(velv.mult(honeyCount * 0.1 * speed2)); // dragforce
    
    // move and display
    p.update();
    p.display();
    
    // remove edge insect and generate a new one
    if ( p.hitEdge() || eatCake ) {
      insects[i] = new Insect(random(width), random(height));
    }
    
    // eat pancake and remove eaten panckes
    if (eatCake) {
      let eaten = pancakes[cakeEaten].eat();
      if (eaten) pancakes.splice(cakeEaten, 1);
    }
  }
  
}

// new pancake at mouse location
function mouseClicked() {
  pancakes.push(new Pancake(mouseX, mouseY));
}