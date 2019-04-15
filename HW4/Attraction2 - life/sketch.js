"use strict";

let planets = [];
let particles = [];

function setup() {
  createCanvas(600,600);
  for (let i = 0; i < 100; i++) {
    particles.push(new Particle(random(width), random(height)))
  }
}

function draw() {
  background(0,50);
  
  // visualize planets
  for (let i = 0; i < planets.length; i++) {
    let p = planets[i];
    p.display();
  }
  
  // move and visualize particles
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    let force = createVector();
    let speed2 = p.vel.magSq();
    let velv = p5.Vector.mult(p.vel, -1).normalize();
    
    let hitSolid = false;
    // apply force from planet
    for (let j = 0; j < planets.length; j++) {
      let planet = planets[j];
      // relative position
      let relPos = new p5.Vector.sub(planet.pos, p.pos);
      let dist = relPos.mag();
      // add gravatation
      force.add(relPos.copy().mult(0.01/(dist^3)));
      
      if (dist < planet.solid / 2) {
        // if in the planet
        hitSolid = true;
      }
      else if (dist < planet.liquid / 2) p.applyForce(velv.mult(0.1 * speed2));
      else if (dist < planet.gas / 2) p.applyForce(velv.mult(0.01 * speed2));

    }
    p.applyForce(force);
    
    // move and display
    p.update();
    p.display();
    
    if ( p.hitEdge() || hitSolid ) {
      particles[i] = new Particle(random(width), random(height));
      
    }
  }
  
  
}

// new planet at mouse location
function mouseClicked() {
  planets.push(new Planet(mouseX, mouseY));
}
