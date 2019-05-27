"use strict";

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    this.oriPos = this.pos.copy();
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    //this.vel.mult(0.99);
    this.pos.add(createVector(random(-1,1), random(-1,1)).mult(panel.fear));
  }

  applyForce(f) {
    let force = f.copy();
    this.acc.add(force);
  }

  applyAttraction(strength) {
    let relPos = p5.Vector.sub(this.oriPos, this.pos);
    this.applyForce(relPos.mult(0.0005*strength));
  }
  
  attraction() {
    let relPos = p5.Vector.sub(this.oriPos, this.pos);
    return relPos.mult(0.001);
  }

  displayLine(particles, i) {
    let prev = (i + particles.length - 5) % particles.length;
    let next = (i + 5) % particles.length;
    stroke(255, 50);
    //strokeWeight(3);
    line(this.pos.x, this.pos.y, particles[prev].oriPos.x, particles[prev].oriPos.y);
    line(this.pos.x, this.pos.y, particles[next].oriPos.x, particles[next].oriPos.y);
  }
  
  edgeDetection() {
    if (this.pos.x < -width/2 || this.pos.x > width/2
    || this.pos.y < -height/2 || this.pos.y > height/2) return true;
    else return false;
  }
  
  edgeCorrection() {
    if (this.pos.x < -width/2) this.pos.x = -width/2;
    else if (this.pos.x > width/2) this.pos.x = width/2;
    else if (this.pos.y < -height/2) this.pos.y = -height/2;
    else if (this.pos.y > height/2) this.pos.y = height/2;
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    point(0,0);
    pop();
  }
}