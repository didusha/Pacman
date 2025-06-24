'use strict'

const WALL = '🧱'
const FOOD = '🔹'
const EMPTY = ' '
const SUPERFOOD = '🍥'
const CHERRY = '🍒'

var gGame = {
    score: 0,
    isOn: false,
    FoodTotal: 56
}
var gBoard
var gCherryInterval

function init() {
    gGame.FoodTotal = 56
    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)
    renderBoard(gBoard, '.board-container')
    gGame.isOn = true
    gCherryInterval = setInterval(addCherry, 15000)

    var elVictory = document.querySelector('.msg .victory')
    elVictory.classList.add('hide')
    var elGameOver = document.querySelector('.msg .game-over')
    elGameOver.classList.add('hide')
    updateScore(-gGame.score)
}

function buildBoard() {
    const SIZE = 10
    const board = []

    for (var i = 0; i < SIZE; i++) {
        board.push([])

        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD   

            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL     
            }
        }
    }
    //add super food
    board[1][1] = board[board.length - 2][1] = board[1][board.length - 2] = board[board.length - 2][board.length - 2] = SUPERFOOD
    return board
}

function updateScore(diff) {
    gGame.score += diff
    document.querySelector('h2 span').innerText = gGame.score
}

function gameOver() {
    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryInterval)
    renderCell(gPacman.location, '🪦')
    var elGameOver = document.querySelector('.game-over')
    elGameOver.classList.remove('hide')
}

function victory() {
    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryInterval)
    renderCell(gPacman.location, '🥳')
    var elGameOver = document.querySelector('.victory')
    elGameOver.classList.remove('hide')
}

function addCherry() {
    var pos = findEmptyCell()
    if(!pos) return

    gBoard[pos.i][pos.j] = CHERRY
    renderCell(pos, CHERRY)
}

function findEmptyCell() {
    //create pos array contains empty board spaces and not wall - pos{i, j}
    var emptyCells = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var currCell = gBoard[i][j]
            if (currCell === EMPTY)
                emptyCells.push({ i, j })
        }
    }
    //get random position 
    var idx = getRandomIntInclusive(0, emptyCells.length)
    var pos = emptyCells[idx]
    return pos
}

//flash buttons
function flashOnceWrongAnswer(elBtn) {
    elBtn.classList.add('wrong')
    setTimeout(() => {
        elBtn.classList.remove('wrong')
    }, 1500)
}

function playAudio() {
    var audio = new Audio('audio/audio.mp3')
    audio.play()
    audio.volume = 0.2
}
