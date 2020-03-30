// const PACMAN = '&#9786;';
const PACMAN = '😷';

var gPacman;

function createPacman(board) {
  gPacman = {
    location: {
      i: 3,
      j: 5
    },
    isSuper: false,
    isOnPowerFood: false
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(eventKeyboard) {
  if (!gGame.isOn) return;
  // console.log('eventKeyboard:', eventKeyboard);

  var nextLocation = getNextLocation(eventKeyboard);
  // User pressed none-relevant key in the keyboard
  if (!nextLocation) return;

  var nextCell = gBoard[nextLocation.i][nextLocation.j];

  // Hitting a WALL, not moving anywhere
  if (nextCell === WALL) return;

  // Hitting FOOD? update score
  if (nextCell === FOOD) updateScore(1);
  
  if (nextCell === CHERRY) updateScore(10);

  // Hitting GHOSST?
  else if (nextCell === GHOST) {

    if (gPacman.isSuper === true) {
      for (var i = 0; i < gGhosts.length; i++) {
        if (gGhosts[i].location.i === nextLocation.i &&
          gGhosts[i].location.j === nextLocation.j) {
          killGhost(i);
        }
      }
    } else {
      var printGameOver = document.querySelector('.game-over');
      printGameOver.style.display = 'block';
      gameOver()
      renderCell(gPacman.location, EMPTY);
      return;
    }
  }

  else if (nextCell === POWERFOOD) {
    gPacman.isSuper = true;
    setTimeout(pacmanIsSuperFalse, 5000)
    setTimeout(returnGhosts, 5000)

  }

    // Update the model to reflect movement
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
    // Update the DOM
    renderCell(gPacman.location, EMPTY);

    // Update the pacman MODEL to new location  
    gPacman.location = nextLocation;

    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    // Render updated model to the DOM
    renderCell(gPacman.location, PACMAN);

    //check if all food is collected
    var foodCount = 0;
    for (var i = 1; i < gBoard.length - 1; i++) {
      if (gBoard[i].includes(FOOD)) foodCount++
    }
    if (!foodCount > 0) foodCount = 0;
    if (foodCount === 0) {
      var printVictory = document.querySelector('.victory');
      printVictory.style.display = 'block';
      gameOver()
    }
  }

  function getNextLocation(keyboardEvent) {
    var nextLocation = {
      i: gPacman.location.i,
      j: gPacman.location.j
    };

    switch (keyboardEvent.code) {
      case 'ArrowUp':
        nextLocation.i--;
        break;
      case 'ArrowDown':
        nextLocation.i++;
        break;
      case 'ArrowLeft':
        nextLocation.j--;
        break;
      case 'ArrowRight':
        nextLocation.j++;
        break;
      default: return null;
    }
    return nextLocation;
  }

  function pacmanIsSuperFalse() {
    gPacman.isSuper = false;
  }