"use strict";

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    this.size = 3;
  }
  
  updateC() {
    
  }
  
  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
    this.pos.add(createVector(random(1)-0.5, random(1)-0.5).mult(3));
  }
  
  applyForce(f) {
    let force = f.copy();
    this.acc.add(force);
  }
  
  reflect(vec) {
    // take in a vecter pointing to planets' heart
    let tangential = createVector(vec.y, -vec.x);
    let angle = this.vel.angleBetween(tangential);
    this.vel.rotate( PI - angle * 2 );
  }
  
  hitEdge() {
    let hit = false;
    if ( (this.pos.x < 0) || (this.pos.x > width) ||
          (this.pos.y < 0) || (this.pos.y > height)) {
            hit = true
          }
    return hit;
  }
  
  display() {
    push();
    
    noStroke();
    fill(255);
    translate(this.pos.x, this.pos.y);
    ellipse(0, 0, this.size, this.size);
    //stroke(255,0,0);
    //line(0,0,this.vel.x,this.vel.y);
    
    pop();
  }
}