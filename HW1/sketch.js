function setup() {
  createCanvas(400, 400);
  background(0);
}

function draw() {
  background(0,5);
  noStroke();
  frameRate(50);
  if (mouseIsPressed) {
    ellipse(frameCount % width,height/2 + 200*(noise(frameCount/50)-0.5),3,3);
  } else {
  	ellipse(frameCount % width,height/1.3,3,3);
  }
}