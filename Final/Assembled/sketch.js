"use strict";

let ssRing;
let PALETTE, SIZE;
let EMOTIONS = ['joy', 'fear', 'sadness', 'anger'];
let values = [];
let gui, controller, panel;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);

  // palette of emotion
  PALETTE = {
    'joy': [color(150, 100, 30, 200), color(150, 100, 80, 200)],
    'fear': [color(120, 20, 150, 200), color(100, 20, 120, 200)],
    'sadness': [color(10, 60, 140, 200), color(10, 30, 120, 100)],
    'anger': [color(80, 10, 0, 200), color(100, 0, 10, 200)]
  };
  // size of sparkles
  SIZE = {
    'joy': [10, 28],
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

  values = [3, 0, 0, 0];

  // set up sparkle system ring
  ssRing = new SSRing(width / 2, height / 2);
  ssRing.initiate();

}

function draw() {
  // calculate the probability list (values)
  let sum = 0;
  for (let i = 0; i < 4; i++) {
    sum += panel[EMOTIONS[i]];
    values[i] = sum;
  }
  if (sum) values = values.map(function(x) {
    return x / sum;
  });

  // draw
  blendMode(NORMAL);
  background(0);
  blendMode(ADD);
  ssRing.run();

}