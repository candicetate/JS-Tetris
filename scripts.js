document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  let squares = Array.from(document.querySelectorAll(".grid div"));
  const scoreDisplay = document.querySelector("#score");
  const startButton = document.querySelector("#start-button");
  const width = 10;
  let nextRandom = 0;
  let timerId;

  //The Tetrominoes
  const lTetromino = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2],
  ];

  const zTetromino = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
  ];

  const tTetromino = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1],
  ];

  const oTetromino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
  ];

  const iTetromino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
  ];

  const theTetriminoes = [
    lTetromino,
    zTetromino,
    tTetromino,
    oTetromino,
    iTetromino,
  ];

  let currentPosition = 4;
  let currentRotation = 0;

  // Start with random block
  let random = Math.floor(Math.random() * theTetriminoes.length);
  let current = theTetriminoes[random][currentRotation];

  // Draw the first block
  function draw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.add("tetrimino");
    });
  }

  // Undraw the first block
  function undraw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.remove("tetrimino");
    });
  }

  //Make the block move down every second
  //timerID = setInterval(moveDown, 1000);

  //Key strokes
  function control(event) {
    if (event.keyCode === 37) {
      moveLeft();
    } else if (event.keyCode === 38) {
      rotate();
    } else if (event.keyCode === 39) {
      moveRight();
    } else if (event.keyCode === 40) {
      moveDown();
    }
  }
  document.addEventListener("keyup", control);

  //Move down function
  function moveDown() {
    undraw();
    currentPosition += width;
    draw();
    freeze();
  }

  //Freeze function
  function freeze() {
    if (
      current.some((index) =>
        squares[currentPosition + index + width].classList.contains("taken")
      )
    ) {
      current.forEach((index) =>
        squares[currentPosition + index].classList.add("taken")
      );
      //start a new block falling
      random = nextRandom;
      nextRandom = Math.floor(Math.random() * theTetriminoes.length);
      current = theTetriminoes[random][currentRotation];
      currentPosition = 4;
      draw();
      displayShape();
    }
  }

  // Find the edges
  function moveLeft() {
    undraw();
    const isAtLeftEdge = current.some(
      (index) => (currentPosition + index) % width === 0
    );

    if (!isAtLeftEdge) currentPosition -= 1;

    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains("taken")
      )
    ) {
      currentPosition += 1;
    }

    draw();
  }

  function moveRight() {
    undraw();
    const isAtRightEdge = current.some(
      (index) => (currentPosition + index) % width === width - 1
    );

    if (!isAtRightEdge) currentPosition += 1;

    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains("taken")
      )
    ) {
      currentPosition -= 1;
    }

    draw();
  }

  //Rotate
  function rotate() {
    undraw();
    currentRotation++;
    if (currentRotation == current.length) {
      currentRotation = 0;
    }
    current = theTetriminoes[random][currentRotation];
  }

  // Show next

  const displaySquares = document.querySelector(".mini-grid");
  const displayWidth = 4;
  let displayIndex = 0;

  // Show without rotation
  const upNext = [
    [1, displayWidth + 1, displayWidth * 2 + 1, 2], //lTetromino
    [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], //zTetromino
    [1, displayWidth, displayWidth + 1, displayWidth + 2], //tTetromino
    [0, 1, displayWidth, displayWidth + 1], //oTetromino
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1], //iTetromino1
  ];

  //display up next
  function displayShape() {
    displaySquares.forEach((square) => {
      square.classList.remove("tetrimino");
      square.style.backgroundColor = "";
    });
    upNext[nextRandom].forEach((index) => {
      displaySquares[displayIndex + index].classList.add("tetrimino");
      displaySquares[displayIndex + index].style.backgroundColor =
        colors[nextRandom];
    });
  }

  // Start / Pause button

  startButton.addEventListener("click", () => {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    } else {
      draw();
      timerId = setInterval(moveDown, 1000);
      nextRandom = Math.floor(Math.random() * theTetriminoes.length);
      displayShape();
    }
  });
});
