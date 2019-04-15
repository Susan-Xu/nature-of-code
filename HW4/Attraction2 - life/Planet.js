"use strict";

class Planet {
  constructor(x, y) {
    this.pos = createVector(x, y);
    // this.size = random(200, 300);
    this.solid = random(80, 100);
    this.liquid = random(10, 20) + this.solid;
    this.gas = random(20, 40) + this.liquid;
  }

  
  display() {
    push();
    
    noStroke();
    translate(this.pos.x, this.pos.y);
    
    // atmosphere
    fill(255, 15);
    ellipse(0, 0, this.gas, this.gas);
    // water
    fill(240, 180, 180, 50);
    ellipse(0, 0, this.liquid, this.liquid);
    // rocks
    fill(240, 180, 180);
    ellipse(0, 0, this.solid, this.solid);
    
    pop();
  }
}