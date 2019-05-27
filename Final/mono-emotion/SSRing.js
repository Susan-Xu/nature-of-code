"use strict";

class SSRing {
  constructor(x, y) {
    this.spkSystems = [];
    this.pos = createVector(x, y);
    this.rotspeed = random(-0.01, 0.01);
    this.num = 20;
    this.dominate = 'sadness';
  }

  initiate() {
    for (let i = 0; i < this.num; i++) {
      let ss = new SpkSystem(cos(TWO_PI / this.num * i) * 100, sin(TWO_PI / this.num * i) * 100);
      ss.pos.mult(random(1.1, 1.9));
      ss.initiate();
      this.spkSystems.push(ss);
    }
  }

  run() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.rotspeed * frameCount);

    let check = this.checkStyle();

    for (let i = 0; i < this.spkSystems.length; i++) {
      let ss = this.spkSystems[i];
      ss.run(check, this.dominate);
      // if (check) {
      //   ss.updateStyle(this.dominate);
      // }
    }
    pop();


  }

  checkStyle() {
    let check = false;
    let maxV = panel[this.dominate];
    for (let i = 0; i < 4; i++) {
      let emotion = EMOTIONS[i];
      
      if (panel[emotion] > maxV) {
        maxV = panel[emotion];
        this.dominate = emotion;
        check = true;
      }
    }
    return check;
  }

}