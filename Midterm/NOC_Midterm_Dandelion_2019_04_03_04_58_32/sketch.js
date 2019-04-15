"use strict"
let mic, gui, micLevel;
let controller, panel;
let dandelions = [];

function setup() {
  createCanvas(700, 700);
  dandelions.push(new Dandelion(width / 2, height / 2));

  // setup GUI
  controller = function() {
    this.debug = false;
    this.strength = 0.2;
    this.number = 3;
    this.day = true;
  }
  panel = new controller();
  gui = new dat.GUI();
  gui.add(panel, 'debug');
  gui.add(panel, 'strength', 0.2, 0.8);
  gui.add(panel, 'number', 1, 7).step(1);
  gui.add(panel, 'day');

  // setup mic
  mic = new p5.AudioIn()
  mic.start();
}

function draw() {
  background((panel.day)? 255 : 50);

  // get mic
  micLevel = mic.getLevel();
  if (panel.debug) {
    ellipse(width * 0.1, constrain(height - micLevel * height * 5, 0, height), 10, 10);
  }

  for (let i = 0; i < dandelions.length; i++) {
    let d = dandelions[i];
    d.applyForce(createVector(micLevel, random(-0.1)));
    d.display();
  }

  if (dandelions.length > panel.number) {
    dandelions.shift();
  }

}

function doubleClicked() {
  dandelions.push(new Dandelion(mouseX, mouseY));
}
