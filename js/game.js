'use strict';
const WALL = '🏠';
const FOOD = '.';
const POWERFOOD = '💊';
const EMPTY = ' ';
const CHERRY = '👨‍⚕️'

var gCherryInterval;

var gBoard;
var gGame = {
  score: 0,
  isOn: false
};

function init() {
  gBoard = buildBoard();

  createPacman(gBoard);
  createGhosts(gBoard);

  printMat(gBoard, '.board-container');
  // console.table(gBoard);
  gGame.isOn = true;
  gCherryInterval = setInterval(addCherry, 15000)
}

function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;

      if (i === 0 || i === SIZE - 1 ||
        j === 0 || j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)) {

        board[i][j] = WALL;
      }
      if (i === 1 && j === 1 ||
        i === 1 && j === SIZE - 2 ||
        i === SIZE - 2 && j === 1 ||
        i === SIZE - 2 && j === SIZE - 2) {
        board[i][j] = POWERFOOD;
      }
    }
  }
  return board;
}

function updateScore(value) {
  // Update both the model and the dom for the score
  gGame.score += value;
  document.querySelector('header h3 span').innerText = gGame.score;
}


function gameOver() {
  gGame.isOn = false;
  clearInterval(gIntervalGhosts);
  clearInterval(gCherryInterval);
  gIntervalGhosts = null;
}

function resetGame() {
  init()
  var printGameOver = document.querySelector('.game-over');
  printGameOver.style.display = 'none';
  var printVictory = document.querySelector('.victory');
  printVictory.style.display = 'none';
}

function addCherry() {

  var emptyCellsArray = [];


  for (var i = 1; i < gBoard.length - 1; i++) {
    for (var j = 1; j < gBoard[i].length - 1; j++) {
      if (gBoard[i][j] === EMPTY) {
        emptyCellsArray.push({ i: i, j: j })
      }
    }
  }
  if (emptyCellsArray.length > 0) {
    var randomIndex = getRandomIntInclusive(0, emptyCellsArray.length - 1)
    gBoard[emptyCellsArray[randomIndex].i][emptyCellsArray[randomIndex].j] = CHERRY
    renderCell(emptyCellsArray[randomIndex], CHERRY)
  }
}