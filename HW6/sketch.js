"use strict"

let balls = [];
let debug = false;

function setup() {
  createCanvas(windowWidth/2, windowHeight);
  for (let i = 0; i < 10; i++) {
    balls.push(new Ball(random(width), random(height), random(5, 10)));
  }

}

function draw() {
  background(255);
  for (let i = 0; i < balls.length; i++) {
    let b = balls[i];
    for (let j = 0; j < balls.length; j++) {
      if (j != i) b.applyAttraction(balls[j]);
      b.collide(balls[j]);
    }
    b.update();
    b.checkEdge();
    b.display();
  }
}

// create new balls
function mouseDragged() {
  if (frameCount % 10 == 0) {
  	balls.push(new Electron(mouseX, mouseY, mouseX-pmouseX, mouseY-pmouseY, random(2, 3)));
  }
}

function doubleClicked() {
  debug = !debug;
}

class Ball {
  constructor(x, y, m) {
    this.mass = m;
    this.rad = this.mass * 5;
    this.pos = createVector(random(this.rad, width - this.rad), random(this.rad, height - this.rad));
    this.vel = createVector();
    this.acc = createVector();
    this.col = color(random(240,250),random(230,240),0,150);
  }

  applyForce(f) {
    let force = f.copy();
    force.div(this.mass);
    this.acc.add(force);
  }

  applyAttraction(target) {
    let relPos = p5.Vector.sub(target.pos, this.pos);
    let dis = relPos.mag();
    let force = p5.Vector.mult(relPos, 10 * target.mass * this.mass / dis ** 3);
    this.applyForce(force);
  }

  collide(target) {
    let relPos = p5.Vector.sub(target.pos, this.pos);
    let dis = relPos.mag();
    relPos = (dis > 5) ? relPos : relPos.normalize().mult(5);
    if ((target.rad + this.rad) > dis) {
      target.applyForce(relPos.mult(0.2));
      this.applyForce(relPos.mult(-1));
      // change color
      if( target instanceof Electron ) {
        this.col = lerpColor(this.col, target.col, (0.5/this.rad))
      }
    }
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  checkEdge() {
    if (this.pos.x > width - this.rad) {
      this.vel.x *= -0.8;
      this.pos.x = width - this.rad;
    } else if (this.pos.x < this.rad) {
      this.vel.x *= -0.8;
      this.pos.x = this.rad;
    }
    if (this.pos.y > height - this.rad) {
      this.vel.y *= -1;
      this.pos.y = height - this.rad;
    } else if (this.pos.y < this.rad) {
      this.vel.y *= -0.3;
      this.pos.y = this.rad;
    }
  }


  display() {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    fill(this.col);
    ellipse(0, 0, this.rad * 2);
    if (debug) {
      stroke(0);
      line(0, 0, this.vel.x * 10, this.vel.y * 10);
    }
    pop();
    stroke(255);
    //line(this.pos.x, this.pos.y, width / 2, height);
  }
}

// smaller particle, constructed with pos, vel, and mass
class Electron extends Ball {
  constructor(x,y,vx,vy,m) {
    super();
    this.mass = m;
    this.rad = this.mass * 5;
    this.pos = createVector(x,y);
    this.vel = createVector(vx,vy);
    this.acc = createVector();
    this.col = color(random(180,255), random(0,50), 10,150);
    
    if (this.vel.mag() > 10) this.vel.normalize().mult(10);
  }
}