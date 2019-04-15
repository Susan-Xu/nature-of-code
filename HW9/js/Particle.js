class Circle {
    constructor(r, cl) {
      this.r = r;
      this.v = 0;
      this.a = random(4, 8);
      this.weight = 3;
  
      this.lifespan = 1.0;
      this.lifeReduction = 0.05;
      this.isDone = false;
      
      this.cl = cl;
      
    }
  
    update() {
      this.r += this.v;
      this.v += this.a;
      this.a = 0;
  
      this.lifespan -= this.lifeReduction;
      if (this.lifespan <= 0.0) {
        this.isDone = true;
      }
    }
  
    display() {
      push();
      noFill();
      stroke(this.cl);
      strokeWeight(this.weight * this.lifespan);
      ellipse(0, 0, this.r * 2);
      pop();
    }
  }