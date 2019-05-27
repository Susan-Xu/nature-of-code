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

  applyAttraction() {
    let relPos = p5.Vector.sub(this.oriPos, this.pos);
    this.applyForce(relPos.mult(0.001));
  }
  
  attraction() {
    let relPos = p5.Vector.sub(this.oriPos, this.pos);
    return relPos.mult(0.001);
  }

  displayLine(particles, i) {
    let prev = (i + particles.length - 2) % particles.length;
    let next = (i + 2) % particles.length;
    stroke(255, 100);
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
    noStroke();

    let angle, amp, x, y;
    angle = this.pos.x / 50 + frameCount * 0.02;
    amp = 7;
    x = cos(angle) * amp;
    y = sin(angle) * amp;
    fill(50, 0, 0, 200);
    ellipse(x, y, 50, 50);

    angle = this.pos.y / 50 + frameCount * 0.03;
    amp = 10;
    x = cos(angle) * amp;
    y = sin(angle) * amp;
    fill(0, 50, 0, 200);
    ellipse(x, y, 50, 50);

    angle = frameCount * 0.07;
    amp = 5;
    x = cos(angle) * amp;
    y = sin(angle) * amp;
    fill(0, 0, 50, 100);
    ellipse(x, y, 50, 50);

    pop();
  }
}