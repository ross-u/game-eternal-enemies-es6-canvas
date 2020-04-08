"use strict";

class Enemy {
  constructor(canvas, y, speed) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.size = 20;
    this.x = canvas.width + this.size;
    this.y = y;
    this.speed = speed;
  }

  draw() {
    this.ctx.fillStyle = "#FF6F27";

    // fillRect(x, y, width, height)
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  updatePosition() {
    this.x = this.x - this.speed;
  }

  isInsideScreen() {
    // if x plus half of its size is smaller then 0 return
    return this.x + this.size / 2 > 0;
  }
}
