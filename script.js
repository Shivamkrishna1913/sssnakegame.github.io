//GAME CONSTANTS

let inputDir = { x: 0, y: 0 };
let foodSound = new Audio("food.mp3");
let gameOverSound = new Audio("gameover.mp3");
let moveSound = new Audio("move.mp3");
let musicSound = new Audio("music.mp3");

let speed = 15;
let score = 0;

let lastPaintTime = 0;
let snakeArr = [
  {
    x: 13,
    y: 13,
  },
];

food = { x: 6, y: 7 };

// GAME VARIABLES
// var board = $("#board");

//GAME FUNCTIONS

function main(ctime) {
  window.requestAnimationFrame(main);
  console.log(ctime);

  if ((ctime - lastPaintTime) / 1000 < 1 / speed)
    // i dont want this render..
    return;
  // else upgrading lastpainttime..
  lastPaintTime = ctime;

  gameEngine();
}

function isCollide(snake) {
  // if snake bumps into himself..

  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }

  // if snake bumps into the wall..

  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  )
    return true;
}
function gameEngine() {
  // part 01 : updating the snake array

  musicSound.play();
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    musicSound.pause();

    inputDir = { x: 0, y: 0 };
    alert("Game Over. Press ok to play again!!");

    snakeArr = [{ x: 13, y: 15 }];
    musicSound.play();
    score = 0;
    Score.innerHTML = "Score : " + score;
  }
  
  // if you have eaten the food , increment the score and regenerate the food
  
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score += 1;
    Score.innerHTML = "Score : " + score;
    if (score > hiscoreval) {
      hiscoreval = score;
      localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
      Hiscore.innerHTML = "High Score : " + hiscoreval;
    }
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  //Moving the snake

  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  //part 02 : display the snake and food

  //Display snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeelement = document.createElement("div");
    snakeelement.style.gridRowStart = e.y;
    snakeelement.style.gridColumnStart = e.x;

    if (index === 0) {
      snakeelement.classList.add("head");
    } else {
      snakeelement.classList.add("snake");
    }
    board.appendChild(snakeelement);
  });

  //Display the food

  foodelement = document.createElement("div");
  foodelement.style.gridRowStart = food.y;
  foodelement.style.gridColumnStart = food.x;
  foodelement.classList.add("food");
  board.appendChild(foodelement);
}

//Main logic starts here

let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
  hiscoreval = 0;
  localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
  hiscoreval = JSON.parse(hiscore);
  Hiscore.innerHTML = "HiScore: " + hiscore;
}
window.requestAnimationFrame(main);

window.addEventListener("keydown", (e) => {
  inputDir = {
    x: 0,
    y: 1, //Start the Game
  };
  moveSound.play();

  switch (e.key) {
    case "ArrowUp":
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case "ArrowDown":
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case "ArrowLeft":
      inputDir.x = -1;
      inputDir.y = 0;
      break;
    case "ArrowRight":
      inputDir.x = 1;
      inputDir.y = 0;

      break;

    default:
      break;
  }
});
