"use strict";

class Game {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.enemies = [];
    this.player = null;
    this.gameIsOver = false;
    this.gameScreen = null;
    this.score = 0;
  }

  // Create `ctx`, a `player` and start the Canvas loop
  start() {
    this.canvasContainer = document.querySelector(".canvas-container");
    this.canvas = this.gameScreen.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");

    // Save reference to the score and live elements
    this.livesElement = this.gameScreen.querySelector(".lives .value");
    this.scoreElement = this.gameScreen.querySelector(".score .value");

    // Set the canvas dimesions to match the parent
    this.containerWidth = this.canvasContainer.offsetWidth;
    this.containerHeight = this.canvasContainer.offsetHeight;
    this.canvas.setAttribute("width", this.containerWidth);
    this.canvas.setAttribute("height", this.containerHeight);

    this.player = new Player(this.canvas, 30);

    // Add event listener for moving the player
    function handleKeyDown(event) {
      if (event.key === "ArrowUp") {
        this.player.setDirection("up");
      } else if (event.key === "ArrowDown") {
        this.player.setDirection("down");
      }
    }

    // Any function provided to eventListener is always invoked by the `window` global object
    // Therefore, we need to bind `this` to the `game` object,
    // to prevent `this` from referencing the `window` object
    const boundHandleKeyDown = handleKeyDown.bind(this);
    document.body.addEventListener("keydown", boundHandleKeyDown);

    this.startLoop();
  }

  startLoop() {
    const loop = function () {
      // 1. UPDATE THE STATE OF PLAYER AND ENEMIES

      // // 0. Our player was already created - via `game.start()`

      // // 1. Create new enemies randomly
      if (Math.random() > 0.95) {
        var randomY = this.canvas.height * Math.random();
        var newEnemy = new Enemy(this.canvas, randomY, 5);
        this.enemies.push(newEnemy);
      }

      // // 2. Check if player had hit any enemy (check all enemies)
      this.checkCollisions();

      // // 3. Update the player and check if player is going off the screen
      this.player.handleScreenCollision();

      // // 4. Move the existing enemies
      // // 5. Check if any enemy is going of the screen
      this.enemies = this.enemies.filter(function (enemy) {
        enemy.updatePosition();
        return enemy.isInsideScreen();
      });

      // 2. CLEAR THE CANVAS
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // 3. UPDATE THE CANVAS
      // // Draw the player
      this.player.draw();

      // // Draw the enemies
      this.enemies.forEach(function (enemy) {
        enemy.draw();
      });

      // 4. TERMINATE LOOP IF THE GAME IS OVER
      if (!this.gameIsOver) {
        window.requestAnimationFrame(loop);
      }

      // 5. UPDATE GAME STATUS
      this.updateGameStats();
    }.bind(this);

    // As loop function will be continuously invoked by
    // the `window` object- `window.requestAnimationFrame(loop)`
    // we have to bind the function so that value of `this` is
    // pointing to the `game` object, like this:
    // var loop = (function(){}).bind(this);

    window.requestAnimationFrame(loop);
  }

  checkCollisions() {
    this.enemies.forEach(function (enemy) {
      // We will implement didCollide() in the next step
      if (this.player.didCollide(enemy)) {
        this.player.removeLife();
        console.log("lives", this.player.lives);

        // Move the enemy off screen to the left
        enemy.x = 0 - enemy.size;

        if (this.player.lives === 0) {
          this.gameOver();
        }
      }
    }, this);
    // We have to bind `this`
    // as array method callbacks `this` value defaults to undefined.
  }

  gameOver() {
    // flag `gameIsOver = true` stops the loop
    this.gameIsOver = true;

    // Call the `endGame` function from `main` to remove the Game screen
    // and show the Game Over Screen
    endGame(this.score);
  }

  updateGameStats() {
    this.score += 1;
    this.livesElement.innerHTML = this.player.lives;
    this.scoreElement.innerHTML = this.score;
  }
}
