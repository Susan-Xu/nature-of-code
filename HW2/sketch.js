let x,y,vx,vy;
let particles = [];
let num = 30;

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < num; i++) {
    particles.push(new Particle(width/2, height/2));
  }
}

function draw() {
  background(240);
  for (let i = 0; i < particles.length; i++) {
    particles[i].display();
    //particles[i].bounce();
    particles[i].force();
    particles[i].move();
    
  }
  
  if (mouseIsPressed) {
    particles.push(new Particle(mouseX, mouseY));
  }
  
  if (particles.length > 200) {
    particles.shift();
  }

}

class Particle {
  constructor(x, y) {
    this.size = random(10,20);
    this.x = x;
    this.y = y;
    this.vx = random(-2,2);
    this.vy = random(0.5,2);
    this.color = color(random(200,255),150,200,90);
  }
  
  bounce() {
    if ((this.x > width-this.size/2) || (this.x < this.size/2)) {
    	// damping
      this.vy = 0.9*this.vy;
      this.vx = -0.9*this.vx;
    }
    if ((this.y > height-this.size/2) || (this.y < this.size/2)) {
    	// damping
      this.vy = -0.9*this.vy;
      this.vx = 0.9*this.vx;
    }
  }
  
  move() {
    this.x = (this.x + this.vx + random(-0.5,0.5)) % width;
    this.y = (this.y + this.vy) % height;
    // // gravity
    // this.vy += 0.2;
  }
  
  force() {
  	let force = map(mouseX,0,width,-3,3);
    this.x += force;
  }
  
  display() {
    fill(this.color);
    noStroke();
    ellipse(this.x < 0 ? (this.x + width) : this.x, // x position
            this.y < 0 ? (this.y + width) : this.y, // y position
            this.size, this.size);
  }
  
}