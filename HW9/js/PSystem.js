class CSystem {
    constructor(x, y, cl) {
      this.origin = createVector(x, y);
      this.particles = [];
      this.color = cl;

      this.lifespan = 1.0;
      this.lifeReduction = 0.03;
      this.isDone = false;
    }
  
    run() {
      push();
      translate(this.origin.x, this.origin.y);
      if (this.particles.length < 2) {
        this.particles.push(new Circle(5, this.color));
      }
      for (let i = 0; i < this.particles.length; i++) {
        let p = this.particles[i];
        p.update();
        p.display();
      }
      pop();
  
      //remove
      for (let i = 0; i < this.particles.length; i++) {
        let p = this.particles[i];
        if (p.isDone) this.particles.splice(i, 1);
      }

      // count life
      this.lifespan -= this.lifeReduction;
      if (this.lifespan <= 0.0) {
        this.isDone = true;
      }
    }
  
  }