"use strict";

class Pancake {
  constructor(x, y) {
    this.pos = createVector(x, y);
    // this.size = random(200, 300);
    this.cake = random(80, 100);
    this.honey = random(50, 80) + this.cake;
    this.mass = this.cake / 1000;
  }
  
  eat() {
    this.cake--;
    this.honey -= 1.5;
    this.mass = this.cake / 1000;
    return (this.cake < 10);
  }

  
  display() {
    push();
    
    noStroke();
    translate(this.pos.x, this.pos.y);
    
    // honey
    fill(200, 140, 60, 50);
    ellipse(0, 0, this.honey, this.honey);
    // cake
    fill(230, 160, 60);
    ellipse(0, 0, this.cake, this.cake);
    
    pop();
  }
}