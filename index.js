const grid = document.getElementById("grid");
let startBtn = document.getElementById("start");
let restartBtn = document.getElementById("restart");
let gameOver = document.getElementById("gameover");
const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("highScore");
let squares = [];
let currentSnake = [2, 1, 0];
let direction = 1;
let width = 10;
let foodIndex = 0;
let score = 0;
let highScore = 0;
let intervalTime = 1000;
let speed = 0.9;
let timerId;

function createGrid() {
  for (let i = 0; i < width * width; i++) {
    const square = document.createElement("div");

    square.classList.add("square");
    grid.append(square);

    squares.push(square);
  }
}
createGrid();

currentSnake.forEach((index) => squares[index].classList.add("snake"));

let highScoreStore = JSON.parse(localStorage.getItem("highScore"));

highScoreDisplay.textContent = highScoreStore;

restartBtn.addEventListener("click", function () {
  startGame()
  gameOver.textContent = "You Are Restarting Game 😂"
})


function startGame() {
  currentSnake.forEach((index) => squares[index].classList.remove("snake"));
  squares[foodIndex].classList.remove("food");
  clearInterval(timerId);
  currentSnake = [2, 1, 0];
  direction = 1;
  score = 0;
  scoreDisplay.textContent = score;
  highScoreStore = JSON.parse(localStorage.getItem("highScore"));
  highScoreDisplay.textContent = highScoreStore;
  if (score > highScore) {
    highScore = score;
    highScoreDisplay.textContent = highScore;
  }
  intervalTime = 1000;
  generateFood();
  currentSnake.forEach((index) => squares[index].classList.add("snake"));
  timerId = setInterval(move, intervalTime);
  highScore.textContent = highScoreDisplay;
}

function move() {
  if (
    (currentSnake[0] + width >= width * width && direction === width) ||
    (currentSnake[0] % width === width - 1 && direction === 1) ||
    (currentSnake[0] % width === 0 && direction === -1) ||
    (currentSnake[0] - width < 0 && direction === -width) ||
    squares[currentSnake[0] + direction].classList.contains("snake")
  ) {
    startBtn.style.display = "none"
    restartBtn.style.display = "inline-block"
    gameOver.innerHTML = "Game Over 🥹" + "<br>" + "Press Restart Button For Play Again 👆"
    return clearInterval(timerId);
  
  }

  const tail = currentSnake.pop();

  squares[tail].classList.remove("snake");

  currentSnake.unshift(currentSnake[0] + direction);

  if (squares[currentSnake[0]].classList.contains("food")) {
    squares[currentSnake[0]].classList.remove("food");
    squares[tail].classList.add("snake");
    currentSnake.push(tail);
    generateFood();
    score++;
    scoreDisplay.textContent = score;
    if (score > highScore) {
      highScore = score;
      highScoreDisplay.textContent = highScore;
    }
    localStorage.setItem("highScore", JSON.stringify(highScore));
    clearInterval(timerId);
    intervalTime = intervalTime * speed;
    timerId = setInterval(move, intervalTime);
  }

  squares[currentSnake[0]].classList.add("snake");
}

function generateFood() {
  do {
    foodIndex = Math.floor(Math.random() * squares.length);
  } while (squares[foodIndex].classList.contains("snake"));
  squares[foodIndex].classList.add("food");
}
generateFood();

function control(e) {
  if (e.keyCode === 39) {
    direction = 1;
  } else if (e.keyCode === 38) {
    direction = -width;
  } else if (e.keyCode === 37) {
    direction = -1;
  } else if (e.keyCode === 40) {
    direction = +width;
  }
}
document.addEventListener("keydown", control);

startBtn.addEventListener("click", startGame);
