"use strict"

class Spring {
    constructor(b1, b2, len) {
      this.b1 = b1;
      this.b2 = b2;
      this.len = len;
      this.k = 0.04;
      this.color = this.b2.color;
    }
  
    update() {
      let relPos = p5.Vector.sub(this.b1.pos, this.b2.pos); // relative position
      let distance = relPos.mag();
      let force = relPos.normalize().mult(this.len - distance).mult(this.k); // elastic force
      this.b1.applyForce(force);
      this.b2.applyForce(force.mult(-1));
      
      this.color = this.b2.color; // color update
    }
  
    display() {
      push();
      strokeWeight(3);
      stroke(this.color);
      line(this.b1.pos.x, this.b1.pos.y,
        this.b2.pos.x, this.b2.pos.y);
      pop();
    }
  }