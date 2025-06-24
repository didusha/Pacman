'use strict'

const PACMAN = '😃';
var gPacman;

function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {

    if (!gGame.isOn) return
    // console.log('ev', ev);
    const nextLocation = getNextLocation(ev.key)
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // if (!nextLocation) return

    if (nextCell === WALL) return
    if (nextCell === FOOD) {
        updateScore(1)
        gGame.FoodTotal--
    }
    console.log('gGame.FoodTotal', gGame.FoodTotal)
    if (nextCell === CHERRY) updateScore(10)

    if (nextCell === SUPERFOOD) {
        if (gPacman.isSuper) return

        gPacman.isSuper = true
        setTimeout(() => {
            gPacman.isSuper = false
            addGhosts()
        }, 5000)
    }

    moveToNextLocation(nextLocation)

    if (gGame.FoodTotal === 0) victory()

    if (nextCell === GHOST && gPacman.isSuper) {
        removeGhost(nextLocation)
        moveToNextLocation(nextLocation)
    }
    else if (nextCell === GHOST && !gPacman.isSuper) {
        gameOver()
    }
}

//keyboards arrow moves
function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard) {
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
        default:
            return null;
    }
    return nextLocation;
}

//move to next location
function moveToNextLocation(nextLocation) {
    // moving from current location:
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // update the DOM
    renderCell(gPacman.location, EMPTY)

    // Move the pacman to new location:
    // update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
    // update the DOM
    renderCell(gPacman.location, PACMAN)
}