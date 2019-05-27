"use strict";

class SSRing {
  constructor(x, y) {
    this.spkSystems = [];
    this.pos = createVector(x, y);
    this.rotspeed = random(-0.01, 0.01);
    this.num = 20;
    this.rad = 100;
  }

  initiate() {
    for (let i = 0; i < this.num; i++) {
      let ss = new SpkSystem(cos(TWO_PI / this.num * i) * this.rad, sin(TWO_PI / this.num * i) * this.rad);
      ss.pos.mult(random(1.1, 1.9));
      ss.initiate();
      this.spkSystems.push(ss);
    }
  }

  run() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.rotspeed * frameCount);

    for (let i = 0; i < this.spkSystems.length; i++) {
      let ss = this.spkSystems[i];
      ss.run();
    }
    pop();
  }

}