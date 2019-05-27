"use strict";

class Sparkle extends Particle {
  constructor(x, y) {
    super();
    this.pos = createVector(x, y);
    this.oriPos = createVector(x, y);
    this.col1 = color(150, 100, 30, 200);
    this.size = random(10,20);
    this.emotion = EMOTIONS[0];
    this.id = random(1);
  }

  updateStyle() {
    let emotion = this.findEmotion();
    if (emotion != this.emotion) {
      let col = PALETTE[emotion];
      let size = SIZE[emotion];
      this.col1 = random(col);
      this.size = random(size[0], size[1]);
      this.emotion = emotion;
    }
  }
  
  findEmotion() {
    for (let i = 0; i < 4; i++) {
      if (this.id < values[i]) return EMOTIONS[i];
    }
    return this.emotion;
  }

  display() {
    push();

    // debug mode
    if (panel.debug) {
      stroke(255, 100);
      line(0, 0, this.pos.x, this.pos.y);
    }

    translate(this.pos.x, this.pos.y);
    noStroke();

    let angle, amp, x, y;
    angle = this.pos.x / 50 + frameCount * 0.02;
    amp = 7;
    x = cos(angle) * amp;
    y = sin(angle) * amp;
    fill(this.col1);
    ellipse(x, y, this.size);

    angle = this.pos.y / 50 + frameCount * 0.03;
    amp = 10;
    x = cos(angle) * amp;
    y = sin(angle) * amp;
    fill(this.col1);
    ellipse(x, y, this.size);

    angle = frameCount * 0.07;
    amp = 5;
    x = cos(angle) * amp;
    y = sin(angle) * amp;
    fill(this.col1);
    ellipse(x, y, this.size);

    pop();
  }
}