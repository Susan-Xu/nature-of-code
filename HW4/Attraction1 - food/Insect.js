"use strict";

class Insect {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(0.5);
    this.acc = createVector();
    this.size = 5;
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
    fill(0);
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    ellipse(0, 0, this.size/1.5);
    ellipse(this.size/1.5, 0, this.size);
    ellipse(-this.size/1.5, 0, this.size);
    
    strokeWeight(1);
    stroke(0);
    line(-this.size/1.2, this.size, this.size/random(1,2), -this.size);
    line(this.size/random(1,2), this.size, -this.size/1.2, -this.size);
    //stroke(255,0,0);
    //line(0,0,this.vel.x,this.vel.y);
    
    pop();
  }
}