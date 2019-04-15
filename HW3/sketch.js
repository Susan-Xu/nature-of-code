let particles = [];
let dusts = [];
let num = 10;
let v_coef;
let colorRGB = {
  r: [180, 180],
  g: [220, 220],
  b: [220, 255],
  a: 100
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  v_coef = 18*sqrt(windowHeight/712);

  for (let i = 0; i < num; i++) {
    particles.push(new Particle(width/2, height));
  }
}


function draw() {
  background(255);
  
  // particles visualization
  for (let i = 0; i < particles.length; i++) {
    particles[i].display();
    particles[i].bounce();
    particles[i].update();
    
    if ( particles[i].isGround() ) {
      // break into dust
      for (let j = 0; j < random(2,5); j++) {
        dusts.push(new SmallerPar(particles[i].getInfo()));
      }
      // disappear
      particles.splice(i,1);
    }
  }
  
  // debugging
  text(dusts.length, 10,20);
  
  // small particles (dust) visualization
  for (let i = 0; i < dusts.length; i++) {
    dusts[i].display();
    dusts[i].bounce();
    dusts[i].update();
    
    if ( dusts[i].isGround() ) {
      // disappear
      dusts.splice(i,1);
    }
  }
  
  // interactive adding balls
  if (mouseIsPressed) {
    particles.push(new Particle(mouseX, height));
  }
  
  // number control
  if (particles.length > 53) {
    particles.pop();
  }

}

// particle
class Particle {
  constructor(x, y) {
    this.size = random(10,20);
    this.pos = createVector(x, y);
    this.vel = createVector(random(-1,1), v_coef * random(-2,-1));
    this.acc = createVector(0, 0.98); //gravity
    this.color = color(random(colorRGB.r[0], colorRGB.r[1]),
    random(colorRGB.g[0], colorRGB.g[1]), 
    random(colorRGB.b[0], colorRGB.b[1]), colorRGB.a);
  }
  
  bounce() { // only for sides
    if ((this.pos.x > width-this.size/2) || (this.pos.x < this.size/2)) {
      this.vel.x = -this.vel.x;
    }
    
  }
  
  isGround() {
    return (this.pos.y > height-this.size/2);
  }
  
  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(1);
  }
  
  
  display() {
    fill(this.color);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
  }
  
  getInfo() {
    return {
      pos: this.pos,
      vel: this.vel, 
      sz: this.size, 
      cl: this.color
    };
  }
  
}

// subclass smaller particle
class SmallerPar extends Particle {
  constructor(info) {
    super();
    this.size = info.sz / 1.5;
    this.pos = info.pos.copy();
    
    this.theta = random(-PI, 0);
    this.vel = p5.Vector.fromAngle(this.theta, info.vel.mag() / random(1.3, 1.7))
    this.color = info.cl;
  }
  
}

function keyPressed() {
  var keyIndex = -1;
  if (key == 'p') {
    colorRGB = {
      r: [200, 255],
      g: [150, 150],
      b: [200, 200],
      a: 70
    };

  } else { 
    colorRGB = {
      r: [180, 180],
      g: [220, 220],
      b: [220, 255],
      a: 100
    };
  }
}