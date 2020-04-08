# Canvas Game - Eternal Enemies (ES6)

<br>

![img](https://media.giphy.com/media/JTOyPqjAX9ebs2fFv3/source.gif)

<br>

## Steps

- Create Files & Initial Setup
- Create the start screen and start game button
- Create Game constructor, Player constructor, Enemy constructor and get elements needed for the game start
- Add Player movement functionality and Instantiate the player object
- Create the game loop using requestAnimationFrame() (updating positions, collisions, drawing players and enemies)
- Implement the collision checking function
- Implement the Game Over logic/sequence (remove game screen, show game over screen, restart, show score)

<br>

## Create Files & Initial Setup

<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">1</h2>

### Create the project and the file structure

```bash
mkdir eternal_enemies && cd eternal_enemies
mkdir src css

touch index.html src/main.js src/game.js src/player.js src/enemy.js css/style.css

code .
```

<br>

<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">2</h2>

### Create basic HTML skeleton

##### `index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Canvas Code Along</title>
    <link rel="stylesheet" href="./css/style.css" />
  </head>
  <body>
    <script src="./src/main.js"></script>
    <script src="./src/game.js"></script>
    <script src="./src/player.js"></script>
    <script src="./src/enemy.js"></script>
  </body>
</html>
```

<br>

<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">3</h2>

### Add the following CSS styles

##### `style.css`

```css
/* ---- CSS reset ---- */

html {
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  margin: 0;
  padding: 0;
}

/* ---- typography ---- */

body {
  color: #111;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 147%;
}

p {
  margin: 0;
}

/* ---- layout ---- */

html,
body {
  height: 100%;
}

.container {
  margin: 0 20px;
}

@media (min-width: 768px) {
  .container {
    max-width: 728px; /* Resizes the container to 728px for large screens */
    margin: 0 auto;
  }
}

/* ---- components ---- */

.game {
  text-align: center;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.game header {
  height: 50px;
  display: flex;
  align-items: center;
}

.game .lives {
  flex: 1;
}

.game .score {
  flex: 1;
}

.game .label {
  font-weight: bold;
}

.game .value {
  font-style: italic;
}

.game .canvas-container {
  flex: 1;
}
```

<br>

<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">4</h2>

### Outline the functions that we will need for creating different game screens and use to start and end the game

##### `main.js`

```js
"use strict";

let game; // instance of the Game
let splashScreen; // Start Game Screen
let gameOverScreen;

// Creates DOM elements from a string representation
function buildDom() {}

// -- splash screen

function createSplashScreen() {}

function removeSplashScreen() {}

// -- game screen

function createGameScreen() {}

function removeGameScreen() {}

// -- game over screen

function createGameOverScreen(score) {}

function removeGameOverScreen() {}

// -- Setting the game state - start or game over

function startGame() {}

function endGame() {}
```

<br>

## Create the start screen and start game button

<br>

<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">5</h2>

### Create functions for creating/removing the game screen:

### `buildDom()`

### `createSplashScreen()`

### `removeSplashScreen()`

##### `main.js`

```js
// buildDom
function buildDom(htmlString) {
  const div = document.createElement("div");
  div.innerHTML = htmlString;
  return div.children[0];
}
```

```js
// createSplashScreen()

// -- splash screen
function createSplashScreen() {
  splashScreen = buildDom(`
    <main>
      <h1>Eternal Enemies</h1>
      <button>Start</button>
    </main>
	`);

  document.body.appendChild(splashScreen);

  const startButton = splashScreen.querySelector("button");
  startButton.addEventListener("click", function () {
    console.log("You clicked Start!");

    // Here we start the game
  });
}
```

```js
// removeSplashScreen()

function removeSplashScreen() {
  // remove() is the DOM method that removes the Node from the page
  splashScreen.remove();
}
```

<br>

<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">6</h2>

### Add the event listener to create the start game screen when the page loads

##### `main.js`

```js
// Run the function `createSplashScreen` once all of the resources are loaded
window.addEventListener("load", createSplashScreen);
```

<br>

## \*\*

###### By clicking the _Start_ button we run the callback that prints 'You clicked Start!' in the console.

<br>

<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">7</h2>

### Create `main.js` functions:

### `createGameScreen`

### `removeGameScreen`

### `startGame`

##### `main.js`

```js
// createGameScreen()

// -- game screen

function createGameScreen() {
  gameScreen = buildDom(`
    <main class="game container">
      <header>
        <div class="lives">
          <span class="label">Lives:</span>
          <span class="value"></span>
        </div>

        <div class="score">
          <span class="label">Score:</span>
          <span class="value"></span>
        </div>
      </header>

      <div class="canvas-container">
        <canvas></canvas>
      </div>
    </main>
	`);

  document.body.appendChild(gameScreen);
  return gameScreen;
}
```

##### `main.js`

```js
// removeGameScreen()

function removeGameScreen() {
  gameScreen.remove();
}
```

##### `main.js`

```js
// startGame()

function startGame() {
  removeSplashScreen();
  createGameScreen();
}
```

<br>

<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">8</h2>

### Now we can update `startButton` to call `startGame` when it is clicked.

##### `main.js`

```js
function createSplashScreen() {
  // ...
  //  ...

  const startButton = splashScreen.querySelector("button");
  //startButton.addEventListener('click', function() {
  //console.log('You clicked Start!');
  //});

  startButton.addEventListener("click", startGame); // <- UPDATE
}
```

## \*\*

###### Now the _Start_ button runs the callback that creates a new screen showing "Lives:" and "Score:"

<br>

## Create Game constructor, Player constructor, Enemy constructor and get elements needed for the game start

<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">9</h2>

### Create a Game constructor

##### `Game` constructor is used to create objects that will represent each game played.

##### `game.js`

```js
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
  start() {}

  startLoop() {}

  checkCollisions() {}

  gameOver() {}

  updateGameStats() {}
}
```

<br>

<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">10</h2>

### Create instance of the `Game` in the `startGame()`

##### `main.js`

```js
function startGame() {
  removeSplashScreen();
  createGameScreen();

  game = new Game(); //  <- UPDATE  ADD
  game.gameScreen = gameScreen; //  <- UPDATE  ADD

  // Start the game
}
```

<br>

<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">11</h2>

### Create the `start` method on the `Game` class prototype.

This method will be the initiator of every new game, and does the following :

- **saves reference to** the **Lives** and **Score** `.value` `<span>`elements, for later updates.
- **saves the reference to canvas** created by `createGameScreen()` in `main.js`, for use when animating.
- **set canvas size** to cover the screen
- **creates the new player object** for the current game
- and **starts the rendering loop** which will be running the animation

##### `game.js`

```js
// start() method on the Game prototype

start() {

  // Save reference to canvas and container. Create ctx
  this.canvasContainer = document.querySelector('.canvas-container');
  this.canvas = this.gameScreen.querySelector('canvas');
  this.ctx = this.canvas.getContext('2d');

  // Save reference to the score and lives elements
  this.livesElement = this.gameScreen.querySelector('.lives .value');
  this.scoreElement = this.gameScreen.querySelector('.score .value');

  // Set the canvas dimensions to match the parent
  this.containerWidth = this.canvasContainer.offsetWidth;
  this.containerHeight = this.canvasContainer.offsetHeight;
  this.canvas.setAttribute('width', this.containerWidth);
  this.canvas.setAttribute('height', this.containerHeight);


  // Create a new player for the current game
  this.player = {};


  // Add event listener for moving the player
  // ..


  // Start the canvas requestAnimationFrame loop
  this.startLoop();
};
```

<br>

<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">12</h2>

### Add `game.start()` method

### to the `main.js` function `startGame()`

##### `main.js`

```js
function startGame() {
  removeSplashScreen();
  // later we need to add clearing of the gameOverScreen

  game = new Game();
  game.gameScreen = createGameScreen();

  game.start(); //  <-- UPDATE
  // End the game
}
```

<br>

<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">13</h2>

### Create the `Player` constructor

##### `player.js`

```js
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

  setDirection(direction) {}

  handleScreenCollision() {}

  removeLife() {}

  draw() {}

  didCollide(enemy) {}
}
```

<br>

<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">14</h2>

### Create methods for the player:

### `setDirection`

### `handleScreenCollision`

### `removeLife`

### `draw`

##### `player.js`

```js
// setDirection()  - method on the Player prototype

setDirection (direction) {
  // +1 down  -1 up
  if (direction === 'up') this.direction = -1;
  else if (direction === 'down') this.direction = 1;
};
```

##### `player.js`

```js
// handleScreenCollision()  - method on the Player prototype

handleScreenCollision () {
  this.y = this.y + this.direction * this.speed;
  const screenTop = 0;
  const screenBottom = this.canvas.height;

  const playerTop = this.y;
  const playerBottom = this.y + this.size;

  if (playerBottom > screenBottom) this.direction = -1;
  else if (playerTop < screenTop) this.direction = 1;
};
```

##### `player.js`

```js
// removeLife()  - method on the Player prototype

removeLife () {
  this.lives -= 1;
};
```

##### `player.js`

```js
// draw()  - method on the Player prototype

draw() {
  this.ctx.fillStyle = "#66D3FA";
  // fillRect(x, y, width, height)
  this.ctx.fillRect(this.x, this.y, this.size, this.size);
}
```

<br>

<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">15</h2>

### Create the Enemy constructor

##### `enemy.js`

```js
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

  draw() {}

  updatePosition() {}

  isInsideScreen() {}
}
```

<br>

<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">16</h2>

### Create the `Enemy` methods :

### `draw`

### `updatePosition`

### `isInsideScreen`

##### `enemy.js`

```js
// draw()  - method on the Enemy prototype

draw () {
  this.ctx.fillStyle = '#FF6F27';

  // fillRect(x, y, width, height)
  this.ctx.fillRect(this.x, this.y, this.size, this.size);
};
```

##### `enemy.js`

```js
// updatePosition()  - method on the Enemy prototype

updatePosition () {
  this.x = this.x - this.speed;
};
```

##### `enemy.js`

```js
// isInsideScreen()  - method on the Enemy prototype

isInsideScreen () {
  // if x plus half of its size is smaller then 0 return
  return this.x + this.size / 2 > 0;
};
```

<br>

## Add movement functionality and Instantiate the player object

<br>

<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">17</h2>

### Update method in `game.js` - `Game.prototype.start()`

##### 1. Create the `new` `Player` instance .

##### 2. Create the `handleKeyDown` function.

##### 2. Add the event listener, with callback - `handleKeyDown` , listening on keyboard key press.

##### 3. Bind event callback `handleKeyDown`, as the context (`this` value) of event callbacks is the global `Window` object.

##### `game.js`

```js
// start()  - method on the Game prototype

start () {

//	...
	//	...
		//	...


  // this.player = {};
  this.player = new Player(this.canvas, 3);		//	<-- UPDATE


  // Event listener callback function
    function handleKeyDown(event) {
      if (event.key === "ArrowUp") {
        this.player.setDirection("up");
      } else if (event.key === "ArrowDown") {
        this.player.setDirection("down");
      }
    }

    const boundHandleKeyDown = handleKeyDown.bind(this);
    document.body.addEventListener("keydown", boundHandleKeyDown);

    // Any function provided to eventListener is always invoked by the `window` global object
    // Therefore, we need to bind `this` to the `game` object,
    // to prevent `this` from referencing the `window` object


  // Start the canvas requestAnimationFrame loop
  this.startLoop();
};
```

<br>

<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">18</h2>

### When the game starts, we can press UP and DOWN keys and print direction to the console, but we will not see the player ?

### Why is that?

...

### Because we are missing the game loop!

<br>

## Create the game loop using `requestAnimationFrame()` (updating positions, collisions, drawing players and enemies)

<br>

<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">19</h2>

### Let's create the game loop

##### `game.js`

```js
// startLoop()  - method on the Game prototype

startLoop () {
  const loop = function() {
    console.log('in loop');

    // EVERYTHING HAPPENS HERE !

    if (!this.gameIsOver) {
      window.requestAnimationFrame(loop);
    }
  }.bind(this);

	// As loop function will be continuously invoked by
	// the `window` object- `window.requestAnimationFrame(loop)`
	// we have to bind the function so that value of `this` is
	// pointing to the `game` object, like this:
	// var loop = (function(){}).bind(this);

  window.requestAnimationFrame(loop);
};
```

<br>

<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">20</h2>

### We can now test the loop by checking the `console` in the browser.

<br>

<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">21</h2>

### Using the comments, let's line out the steps that need to be implemented in the `loop` function

##### `game.js`

```js
// startLoop()  - method on the Game prototype

startLoop () {
  const loop = function() {

// 1. UPDATE THE STATE OF PLAYER AND ENEMIES

    // 0. Our player was already created - via `game.start()`

    // 1. Create new enemies randomly

    // 2. Check if player had hit any enemy (check all enemies)

    // 3. Update the player and check if player is going off the screen

    // 4. Move existing enemies

    // 5. Check if any enemy is going of the screen


// 2. CLEAR THE CANVAS


// 3. UPDATE THE CANVAS
    // Draw the player

    // Draw the enemies

// 4. TERMINATE LOOP IF GAME IS OVER
    if (!this.gameIsOver) {
      window.requestAnimationFrame(loop);
    }
  }.bind(this);

  // As loop function will be continuously invoked by
  // the `window` object- `window.requestAnimationFrame(loop)`
  // we have to bind the function so that value of `this` is
  // pointing to the `game` object, like this:
  // var loop = (function(){}).bind(this);

  window.requestAnimationFrame(loop);
};

```

<br>

<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">22</h2>

### Let's now write the code for each comment

##### `game.js`

```js
// startLoop()  - method on the Game prototype

startLoop () {
  const loop = function() {
// 1. UPDATE THE STATE OF PLAYER AND ENEMIES

    // 0. Our player was already created - via `game.start()`

    // 1. Create new enemies randomly
    if (Math.random() > 0.98) {
      var randomY = this.canvas.height * Math.random();
      var newEnemy = new Enemy(this.canvas, randomY, 5);
      this.enemies.push(newEnemy);
    }

    // 2. Check if player had hit any enemy (check all enemies)
    this.checkCollisions();

    // 3. Update the player and check if player is going off the screen
    this.player.handleScreenCollision();

    // 4. Move existing enemies
    // 5. Check if any enemy is going of the screen
    this.enemies = this.enemies.filter(function(enemy) {
      enemy.updatePosition();
      return enemy.isInsideScreen();
    });


// 2. CLEAR THE CANVAS
   this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);


// 3. UPDATE THE CANVAS
    // Draw the player
    this.player.draw();

    // Draw the enemies
    this.enemies.forEach(function(enemy) {
      enemy.draw();
    });

// 4. TERMINATE LOOP IF GAME IS OVER
    if (!this.gameIsOver) {
      window.requestAnimationFrame(loop);
    }

  }.bind(this);

  // As loop function will be continuously invoked by
  // the `window` object- `window.requestAnimationFrame(loop)`
  // we have to bind the function so that value of `this` is
  // pointing to the `game` object, like this:
  // var loop = (function(){}).bind(this);

  window.requestAnimationFrame(loop);
};
```

<br>

<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">23</h2>

#### If we run the game now, we will see that the movement and animations work fine, except for the collisions (which we didn't implement yet).

<br>

## Implement the collision checking function

<br>

<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">24</h2>

### Implement the `player` and `enemies` collision checking

##### Our loop is calling the `checkCollisions` but we don't have any functionality in that function. Let's update it.

##### `game.js`

```js
// checkCollisions()  - method on the Game prototype

checkCollisions () {

  this.enemies.forEach( function(enemy) {

    // We will implement didCollide() in the next step
    if ( this.player.didCollide(enemy) ) {

      this.player.removeLife();
      console.log('lives', this.player.lives);

      // Move the enemy off screen, to the left
      enemy.x = 0 - enemy.size;

      if (this.player.lives === 0) {
        this.gameOver();
      }
    }
  }, this);
  // We have to bind `this`
  // as array method callbacks `this` value defaults to undefined.
};
```

<br>

<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">25</h2>

### Implement the `didColide()` method in `player.js` checking the player sides for collision.

##### `player.js`

```js
// didCollide() - method on the Player prototype

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
    }
    else {
      return false;
    }
};
```

<br>

## \*\*

###### Now when a collision occurs we print out the player's `lives` to the console.

<br>

## Implement the game over logic/sequence (remove game screen, show game over screen, restart, show score)

<br>

<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">26</h2>

### Implement the `gameOver()` method

The `gameOver` method will be used to set the `gameIsOver` flag, and to invoke the function `gameEnd` from the `main.js` which removes the game screen and creates game over screen.

##### `game.js`

```js
// gameOver() - method on the Game prototype

gameOver () {
  // flag `gameIsOver = true` stops the loop
  this.gameIsOver = true;

  console.log('GAME OVER');

  // Call the `endGame` function from `main` to remove the Game screen
  // and show the Game Over Screen
  endGame();                           //    <--- UPDATE
};
```

<br>

<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">27</h2>

### Implement the function `endGame` in `main.js` used to remove the current game screen and display the game over screen.

##### `main.js`

```js
// main.js	endGame()

// -- game over
function endGame(score) {
  // Remove the game screen
  gameScreen.remove(); // remove() is the DOM method which removes the DOM Node

  // Create and display game over screen
  gameOverScreen = buildDom(`
  	<main>
  		<h1>Game over</h1>
  		<p>Your score: <span>${score}</span></p>
  		<button>Restart</button>
  	</main>
  `);

  // Add event listener to the Restart button
  var button = gameOverScreen.querySelector("button");
  button.addEventListener("click", startGame);

  document.body.appendChild(gameOverScreen);
}
```

<br>

<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">28</h2>

### Refactor `endGame` function and create two functions:

### `removeGameScreen` and `createGameOverScreen` out of it.

##### `main.js`

```js
function createGameOverScreen() {
  gameOverScreen = buildDom(`
    <main>
      <h1>Game over</h1>
      <p>Your score: <span></span></p>
      <button>Restart</button>
  	</main>
	`);

  const button = gameOverScreen.querySelector("button");
  button.addEventListener("click", startGame);

  document.body.appendChild(gameOverScreen);
}
```

##### `main.js`

```js
// main.js	removeGameScreen()

function removeGameScreen() {
  gameScreen.remove();
}
```

<br>

### Update `endGame` function and invoke `removeGameScreen` and `createGameOverScreen` .

##### `main.js`

```js
// main.js	endGame()

// -- game over
function endGame() {
  //    <--- REFACTOR FUNCTION
  removeGameScreen(); //    <--- UPDATE
  createGameOverScreen(); //    <--- UPDATE
}
```

<br>

<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">29</h2>

### If we try to restart the game we will see that Game Over screen is not being removed.

### We need to implement the `removeGameOverScreen()` method in `main.js`.

##### `main.js`

```js
// main.js	removeGameOverScreen()

function removeGameOverScreen() {
  if (gameOverScreen !== undefined) {
    gameOverScreen.remove();
  }
}
```

```js
// main.js	startGame()

function startGame() {
  removeSplashScreen();
  removeGameOverScreen(); //       		<--  UPDATE

  createGameScreen();

  game = new Game();
  game.gameScreen = gameScreen;

  game.start();
}
```

<br>

<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">30</h2>

### For the end implement the game status - remaining `lives` and the `score`.

### Implement `updateGameStats()` method and call it on each loop iteration

##### `game.js`

```js
// updateGameStats()  -  method on the Game prototype

updateGameStats () {
  this.score += 1;
  this.livesElement.innerHTML = this.player.lives;
  this.scoreElement.innerHTML = this.score;
};
```

```js
// game.js
// startLoop()   -  method on the Game prototype

startLoop () {
  var loop = function() {

   ...

   		...

   			...

    // 4. TERMINATE LOOP IF GAME IS OVER
    if (!this.gameIsOver) {
      window.requestAnimationFrame(loop);
    }

    //  5. Update Game data/stats
    this.updateGameStats();					//	<- UPDATE

  }.bind(this);

  // As loop function will be continuously invoked by
  // the `window` object- `window.requestAnimationFrame(loop)`
  // we have to bind the function so that value of `this` is
  // pointing to the `game` object, like this:
  // var loop = (function(){}).bind(this);

  window.requestAnimationFrame(loop);
};
```

<br>

<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">31</h2>

### Update the `endGame` to pass the score to the game over screen

##### `game.js`

```js
// game.js
// gameOver()   -  method on the Game prototype


gameOver() {
  this.gameIsOver = true;

  // Call the `endGame` function from `main` to remove the Game screen
  // and show the Game Over Screen
  endGame(this.score);                //    <--- UPDATE
}
```

<br>

##### `main.js`

```js
// main.js
// endGame()

function endGame(score) {
  removeGameScreen();
  createGameOverScreen(score);
}
```

<br>

##### `main.js`

```js
function createGameOverScreen(score) {   //         <-- UPDATE
  gameOverScreen = buildDom(`
    <main>
      <h1>Game over</h1>
      <p>Your score: <span>  ${score}  </span></p>
      <button>Restart</button>
    </main>
`);
```

<br>

<h2 style="background-color: green; color: white; display: inline; padding: 10px; border-radius: 10;">THE END</h2>

### MISSION ACCOMPLISHED! :heavy_check_mark: :thumbsup:

### WELL DONE ! :rocket: :confetti_ball: :rocket: :confetti_ball:
