"use strict"

let balls = [];
let springs = [];
let numNow;
let loopNow = true;

let gui, controller, panel;
let CS;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  
  // setup GUI
  controller = function() {
    this.ball = false;
    this.line = true;
    this.num = 3;
    this.mass = 10;
    this.click = false;
  }
  panel = new controller();
  gui = new dat.GUI();
  gui.add(panel, 'ball');
  gui.add(panel, 'line');
  gui.add(panel, 'num', 1, 5).step(1);
  gui.add(panel, 'mass', 1, 15).step(1);
  gui.add(panel, 'click');

  // setup balls and springs
  generator(panel.num);
  numNow = panel.num;

}

function draw() {
  colorMode(HSB);
  background(0,0.03);
  
  // update and display balls/springs
  for (let i = 1; i < balls.length; i++) {
    // springs
    let s = springs[i - 1];
    s.update();
    if (panel.line) s.display();

    // balls
    let b = balls[i];
    let b2 = balls[i - 1];
    b.updateMass(panel.mass)
    b.applyForce(createVector(0, 0.9)); // gravity
    b.drag();
    b.update();
    if (panel.ball) b.display();

    // CS
    if (CS) {
      CS.run();
      if (CS.isDone) CS = null;
    }
    
  }

  // update balls and springs if num changes
  if ( numNow != panel.num ) {
    generator(panel.num);
    numNow = panel.num;
  }

}

// pause + resume
function keyPressed() {
  if (loopNow) noLoop();
  else loop();
  loopNow = !loopNow;
}

// blow Particle System
function mouseReleased() {
  if (panel.click) CS = new CSystem(mouseX, mouseY, springs[0].color);
}

// generate array of balls and springs
function generator(n) {

  balls = [];
  springs = [];

  for (let i = 0; i < n + 1; i++) {
    balls.push(new Ball(
      random(-50, 50) + width / 2, 
      random(height / (n + 2) * (i)), 10));

    if (i) {
      springs.push(new Spring(balls[i - 1], balls[i], height/ (pow(n, 1.5)+1) ));
    }
  }

}

