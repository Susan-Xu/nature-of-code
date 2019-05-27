"use strict";

let particles = [], ssRing;
let PALETTE, SIZE;
let EMOTIONS = ['joy', 'fear', 'sadness', 'anger'];
let values = [];
let gui, controller, panel;

function setup() {
  createCanvas(700, 700);
  background(220);

  // palette
  PALETTE = {
    'joy': [color(150, 100, 30, 200)],
    'fear': [color(120, 20, 150, 200)],
    'sadness': [color(10, 60, 140, 200)],
    'anger': [color(80, 10, 0, 200)]
  };
  SIZE = {
    'joy': [6, 18],
    'fear': [3, 6],
    'sadness': [5, 14],
    'anger': [1, 20]
  };

  // setup GUI
  controller = function() {
    this.debug = false;
    this.joy = 3;
    this.fear = 0;
    this.sadness = 0;
    this.anger = 0;
    this.color = [0, 128, 255, 0.3];
  }
  panel = new controller();
  gui = new dat.GUI();
  gui.add(panel, 'debug');
  //gui.addColor(panel, 'color');
  gui.add(panel, 'joy', 0, 10).step(1);
  gui.add(panel, 'fear', 0, 10).step(1);
  gui.add(panel, 'sadness', 0, 10).step(1);
  gui.add(panel, 'anger', 0, 10).step(1);

  values = [3,0,0,0];

  ssRing = new SSRing(width / 2, height / 2);
  ssRing.initiate();

}

function draw() {
  //propotion
  let sum = 0;
  for (let i = 0; i < 4; i++) {
    sum += panel[EMOTIONS[i]];
    values[i] = sum;
  }
  if (sum) values = values.map(function(x) { return x / sum; });
  console.log(values);
  
  blendMode(NORMAL);
  background(0);
  blendMode(ADD);
  ssRing.run();

}