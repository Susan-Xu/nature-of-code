"use strict"
class Dandelion {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.rad = random(10, 20);
    this.seeds = [];
    this.seedN = this.rad + 8;
    for (let i = 0; i < this.seedN; i++) {
      let ori = i * 2 * PI / this.seedN + PI / 2;
      let vec = p5.Vector.fromAngle(ori);
      vec.mult(this.rad);
      this.seeds.push(new Seed(vec.x, vec.y, ori, this.seedN));
    }
  }

  applyForce(f) {
    for (let i = 0; i < this.seedN; i++) {
      this.seeds[i].applyForce(createVector(f.x * random(1), f.y + random(-0.1, 0.1)));
      this.seeds[i].update();
    }
  }
  
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    fill(150, 180, 161);
    noStroke();
    ellipse(0,0,this.rad*2);
    stroke(150, 180, 161, 100);
    strokeWeight(5);
    line(0, this.rad, 0, height);
    
    for (let i = 0; i < this.seedN; i++) {
      this.seeds[i].display();
    }
    pop();
  }
}