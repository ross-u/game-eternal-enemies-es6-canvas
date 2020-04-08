"use strict";

class Player {
  constructor(canvas, lives) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");

    this.lives = lives;
    this.size = 100;
    this.x = 50;
    this.y = canvas.height / 2;
    this.direction = 0;
    this.speed = 5;
  }

  setDirection(direction) {
    // +1 down  -1 up
    if (direction === "up") this.direction = -1;
    else if (direction === "down") this.direction = 1;
  }

  handleScreenCollision() {
    this.y = this.y + this.direction * this.speed;
    const screenTop = 0;
    const screenBottom = this.canvas.height;

    const playerTop = this.y;
    const playerBottom = this.y + this.size;

    if (playerBottom > screenBottom) this.direction = -1;
    else if (playerTop < screenTop) this.direction = 1;
  }

  removeLife() {
    this.lives -= 1;
  }

  draw() {
    this.ctx.fillStyle = "#66D3FA";
    // fillRect(x, y, width, height)
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  didCollide(enemy) {
    const playerLeft = this.x;
    const playerRight = this.x + this.size;
    const playerTop = this.y;
    const playerBottom = this.y + this.size;

    const enemyLeft = enemy.x;
    const enemyRight = enemy.x + enemy.size;
    const enemyTop = enemy.y;
    const enemyBottom = enemy.y + enemy.size;

    // Check if the enemy sides intersect with any of the player's sides
    const crossLeft = enemyLeft <= playerRight && enemyLeft >= playerLeft;

    const crossRight = enemyRight >= playerLeft && enemyRight <= playerRight;

    const crossBottom = enemyBottom >= playerTop && enemyBottom <= playerBottom;

    const crossTop = enemyTop <= playerBottom && enemyTop >= playerTop;

    if ((crossLeft || crossRight) && (crossTop || crossBottom)) {
      return true;
    } else {
      return false;
    }
  }
}
