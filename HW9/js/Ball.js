"use strict"
class Ball {
    constructor(x, y, m) {
      this.pos = createVector(x, y);
      this.vel = createVector();
      this.acc = createVector();
      this.mass = m;
      this.size = m * 2;
      this.color = color(255, 50);
  
    }
  
    drag() {
      if (mouseIsPressed) {
        let distance = dist(this.pos.x, this.pos.y, mouseX, mouseY);
        if (distance < this.size * 2) {
          this.pos = createVector(mouseX, mouseY);
        }
      }
    }
  
    applyForce(f) {
      let force = f.copy().div(this.mass);
      this.acc.add(force);
    }
  
    updateMass(m) {
      this.mass = m;
    }
  
    update() {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
      this.vel.mult(0.99);

      this.color = color(frameCount/5 % 360, 50, 50, 0.5);
    }
  
    display() {
      push();
      translate(this.pos.x, this.pos.y);
      fill(this.color);
      noStroke();
      ellipse(0, 0, this.size);
      pop();
  
    }
  }