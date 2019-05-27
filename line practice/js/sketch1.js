"use strict";
let particles = [];

function setup() {
  createCanvas(500, 600);
  background(0);
}


function draw() {
  background(0,10);
  stroke(255);
  fill(255);
  
  let vec2 = p5.Vector.fromAngle(random(2*PI));
  

  let vec1 = createVector(100,200);
  let vecMouse = createVector(mouseX,mouseY);
  let myVec = p5.Vector.sub(vecMouse,vec1);
  let angle = myVec.heading();

  // let distance = dist(0,0,vec1.x,vec1.y);
  // let me = vec1.mag();
  // text(me, 10, 20);

  push();
	translate(vec1.x,vec1.y);
  line(0, 0, myVec.x, myVec.y);
  ellipse(myVec.x, myVec.y, 5, 5);
  //noloop();
  pop();

  particles.push( new Particle(mouseX, mouseY) );

  for (let i = 0; i < particles.length; i++) {
    particles[i].display();
    particles[i].update();
  }

  if (particles.length > 100) particles.shift();
}

function coordinate(){
  stroke(255,random(150,255),255,5);
  line(-width,0,width,0);
  line(0,height,0,-height);
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-3,3),random(-3,3));
    this.acc = createVector();
    this.size = 10;
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
  }

  display() {
    push();
    noStroke();
    fill(140);
    ellipse(this.pos.x, this.pos.y, this.size);
    pop();
  }
}