"use strict";

class SpkSystem extends Particle {
  constructor(x, y) {
    super();
    this.pos = createVector(x, y);
    this.oriPos = this.pos.copy();
    this.sparkles = [];
    this.color = color(random(255), random(255), random(255));
    this.rotspeed = random(-0.01, 0.02);
  }

  initiate() {
    for (let i = 0; i < 4; i++) {
      let theta = random(TWO_PI);
      let rad = random(10, 30);
      let s = new Sparkle(cos(theta) * rad, sin(theta) * rad);
      s.pos.mult(random(1.1, 1.9));
      this.sparkles.push(s);
    }
  }

  run(check, emotion) {
    push();

    if (panel.debug) {
      stroke(255, 100);
      line(0, 0, this.pos.x, this.pos.y);
    }

    translate(this.pos.x, this.pos.y);
    rotate(this.rotspeed * frameCount);


    for (let i = 0; i < this.sparkles.length; i++) {
      let s = this.sparkles[i];
      s.display();
      if (check) s.updateStyle(PALETTE[emotion], SIZE[emotion]);
    }
    pop();

    //this.applyAttraction();

    if (panel.sadness + panel.anger != 0) {
      if (panel.sadness > panel.anger) this.blackHole();
      else this.burst();
    }
    if (panel.joy) this.seek();

    this.update();

  }

  blackHole() {
    //this.rotspeed = 0;
    this.edgeCorrection();
    let strength = -0.01 * (1 + panel.sadness);
    this.vel.limit(0.2 * panel.anger + 0.3);
    let force = this.pos.copy().normalize().mult(strength);
    this.applyForce(force);
    if (this.pos.mag() < 40) {
      this.pos.normalize().mult(random(height / 2, height));
    }
  }

  burst() {
    let strength = 1;
    this.vel.limit(2 * panel.anger + 3);
    let force = this.pos.copy().normalize().mult(strength);
    this.applyForce(force);
    if (this.edgeDetection()) {
      this.pos = this.oriPos.copy().normalize();
    }
  }

  seek() {
    // let desired = p5.Vector.sub(this.oriPos, this.pos);
    // desired = this.oriPos.mult(-1);
    // desired.setMag(8);
    // let steer = p5.Vector.sub(desired, this.vel);
    // steer.limit(1 * panel.joy);
    // this.applyForce(steer);
    this.applyAttraction();
  }
}