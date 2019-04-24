let RES = 20;
let flowField = [];
let vehicles = [];
let show = false;

function setup() {
  createCanvas(600, 600);

  // init ff
  for (let x = 0; x < width; x += RES) {
    flowField.push([]);
    for (let y = 0; y < height; y += RES) {
      let theta = map(noise(x / 100, y / 100), 0, 1, 0, TWO_PI);
      flowField[x / RES].push(p5.Vector.fromAngle(theta));
    }
  }

  // init vehicles
  for (let i = 0; i < 800; i++) {
    vehicles.push(new Vehicle(random(width), random(height)));
  }
}

function draw() {
  background(220);
  // draw ff
  if (show) {
    for (let x = 0; x < width; x += RES) {
      for (let y = 0; y < height; y += RES) {
        let vec = flowField[x / RES][y / RES].copy();
        vec.mult(RES / 2);
        line(x, y, x + vec.x, y + vec.y);
      }
    }
  }

  // update and draw vehicles
  for (let i = 0; i < vehicles.length; i++) {
    let v = vehicles[i];
    let flowHere = findFlow(v.pos).copy();
    v.seek(flowHere);
    v.reappear();
    v.update();
    v.display();
  }
}

function mouseClicked() {
  let mouse = createVector(mouseX, mouseY);
  for (let x = 0; x < width; x += RES) {
    for (let y = 0; y < height; y += RES) {
      let prev = flowField[x / RES][y / RES].copy();
      // desired direction
      let vector = p5.Vector.sub(createVector(x, y), mouse);
      let d = vector.mag();
      vector.normalize();

      let amt = map(d, 0, width, 1, 0);
      prev.lerp(vector, amt);

      flowField[x / RES][y / RES] = prev;
    }
  }
}

function keyPressed() {
  show = !show;
}

function findFlow(pos) {
  let i = constrain(floor(pos.x / RES), 0, flowField.length - 1);
  let j = constrain(floor(pos.y / RES), 0, flowField[0].length - 1);
  return flowField[i][j];
}

class Vehicle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(); //random(1),random(-1)
    this.acc = createVector();
    this.maxSpeed = 5;
    this.maxSteer = 0.1;
    this.size = random(5, 10);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  applyForce(f) {
    this.acc.add(f);
  }

  seek(flow) {
    let vector = flow.copy();
    vector.mult(this.maxSpeed);

    // steer force
    let steer = p5.Vector.sub(vector, this.vel);
    steer.limit(this.maxSteer); //- to avoid
    this.applyForce(steer);
  }


  reappear() {
    if (this.pos.x < 0) this.pos.x = width;
    else if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.y < 0) this.pos.y = height;
    else if (this.pos.y > height) this.pos.y = 0;
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    //rotate(this.vel.heading());
    fill(0);
    noStroke();
    //triangle(0, 0, -15, 5, -15, -5);
    ellipse(0, 0, this.size);
    pop();
  }

}