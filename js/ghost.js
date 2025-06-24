'use strict'

const GHOST = '👻'

var gGhosts = []
var gRemovedGhosts = []
var gIntervalGhosts

function createGhost(board) {
    const ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        color: getRandomColor(),
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function createGhosts(board) {
    gGhosts = []
    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        moveGhost(ghost)
    }
}

function moveGhost(ghost) {
    const moveDiff = getMoveDiff();
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    if (nextCell === WALL) return
    if (nextCell === GHOST) return

    // remove from model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // remove from DOM
    renderCell(ghost.location, ghost.currCellContent)

    // add to model
    ghost.location = nextLocation
    ghost.currCellContent = gBoard[ghost.location.i][ghost.location.j]
    gBoard[ghost.location.i][ghost.location.j] = GHOST
    // add to DOM
    renderCell(ghost.location, getGhostHTML(ghost))

    if (nextCell === PACMAN) {
        gameOver()
    }
}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    var color = gPacman.isSuper ? 'blue' : ghost.color
    return `<span class="ghost" style="background-color:${color}">${GHOST}</span>`
}

function removeGhost(nextLocation) {
    var idx
    for (var i = 0; i < gGhosts.length; i++) {
        if (gGhosts[i].location.i === nextLocation.i &&
            gGhosts[i].location.j === nextLocation.j)
            idx = i
    }
    var removedGhost = gGhosts.splice(idx, 1)

    if(removedGhost.currCellContent === FOOD){
        gGame.FoodTotal--
        removedGhost.currCellContent = EMPTY
    }

    gRemovedGhosts.push(removedGhost[0])
    console.log('gRemovedGhosts', gRemovedGhosts)
}

function addGhosts() {
    for (var i = 0; i < gRemovedGhosts.length; i++) {
        gGhosts.push(gRemovedGhosts[i])
    }
    gRemovedGhosts = []
}




