"use strict";

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
}


function draw() {
  translate(width/3,height/2.5);
  rotate( radians(frameCount) );
  //coordinate();
  //ellipse(100,0,5,5);

  //translate(windowWidth/6,windowHeight/6);
  let vec1 = createVector(width/3,height/2.5);
  let vecMouse = createVector(mouseX,mouseY);
  let myVec = p5.Vector.sub(vecMouse,vec1);
  translate(myVec.x,myVec.y);
  rotate( radians(frameCount/6.4) );
  coordinate();
  //ellipse(0,0,5,5);

}

function coordinate(){
  stroke(255,random(150,255),220,15);
  line(-width,0,width,0);
  line(0,height,0,-height);
}

function mousePressed(){
  background(0,50);
}