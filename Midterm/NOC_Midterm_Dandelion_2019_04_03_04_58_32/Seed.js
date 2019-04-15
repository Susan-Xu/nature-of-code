"use strict"
class Seed {
  constructor(x, y, ori, size) {
    this.pos = createVector(x, y);
    this.vel = createVector(); //random(1),random(-1)
    this.acc = createVector();
    this.ori = ori;
    this.oriOri = ori;
    this.size = size;
    this.mass = this.size / 4;
    this.fly = false;
    this.random = random(2);
    this.dir = 3 * PI / 2;
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    if (this.fly) {
      this.ori = lerp(this.ori, this.dir, 0.1);
    }
    this.ori = (this.ori < PI / 2) ? this.ori + PI * 2 : this.ori;
    this.ori = (this.ori > PI * 5 / 2) ? this.ori - PI * 2 : this.ori;
    this.dir = 3 * PI / 2 + this.random;
  }

  applyForce(f) {
    if (f.mag() > panel.strength) {
      this.fly = true;
      let force = f.copy();
      force.div(this.mass);
      this.acc.add(force);
      this.dir = f.heading() + PI * 2 + this.random;
    }
    if (f.mag() > 0.2) {
      this.dir = lerp(this.ori, f.heading() + PI * 2, 0.5);
      this.ori = lerp(this.ori, this.dir, 0.1);
    } else {
      this.ori = lerp(this.ori, this.oriOri, 0.05);
    }
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    push();
    rotate(this.ori + 0.05 * sin(this.random + frameCount * 0.1));


    switch (panel.day) {
      case true:
        stroke(150, 180, 161,100);
        strokeWeight(this.size / 20);
        line(0, 0, this.size * 1.5, 0);

        noStroke();
        fill(150, 180, 161,100);
        ellipse(this.size / 2, 0, this.size, this.size / 4);
        fill(190, 220, 100,100);
        ellipse(this.size * 2, 0, this.size);

        break;
      case false:
        fill(255);
        stroke(255);
        strokeWeight(this.size / 20);
        line(0, 0, this.size * 1.5, 0);

        noStroke();
        fill(255, 150);
        ellipse(this.size / 2, 0, this.size, this.size / 4);
        ellipse(this.size * 2, 0, this.size);
        break;
    }

    pop();
    if (panel.debug) {
      stroke(255, 0, 0);
      strokeWeight(1);
      line(0, 0, this.vel.x * 20, this.vel.y * 20);
    }
    pop();
  }
}