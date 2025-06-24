'use strict'

//render table
function renderBoard(mat, selector) {

    var strHTML = '<table border="0"><tbody>'
    for (var i = 0; i < mat.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {

            const cell = mat[i][j]
            const className = 'cell cell-' + i + '-' + j
            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}

// location such as: {i: 2, j: 7}
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

function getRandomColor() {
    const letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

function generateRandId(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let id = ''
    for (let i = 0; i < length; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return id
}

function showModal() {
    const elModal = document.querySelector('.modal')
    elModal.classList.remove('hidden')
}

function hideModal() {
    const elModal = document.querySelector('.modal')
    elModal.classList.add('hidden')
}

function changeElText(selector, text) {
    document.querySelector(selector).innerText = text
}

//get current time in a normal view
function getTime() {
    return new Date().toString().split(' ')[4]
}

//create a stopwatch
{
var gStartTime
function startTimer() {
    gStartTime = Date.now()
    gTimerInterval = setInterval(updateTimer, 25)
    // console.log(' gTimerInterval:', gTimerInterval)
}

function updateTimer() { 
    const now = Date.now()
    //* Taking the difference between current time and start time
    //* and converting to seconds
    const diff = (now - gStartTime) / 1000
    document.querySelector('.timer span').innerText = diff.toFixed(3)
}

function stopTimer() {
    clearInterval(gTimerInterval)
}
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





