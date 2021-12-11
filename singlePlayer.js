import { grid, boxId, emptyBoxes } from './boardState.js'
import { checkForVictory } from './winningConditions.js'
import { savedHistories } from './showHistory.js'

let yourScore = 0
let opponentScore = 0

export const enableEventListeners = () => {
  grid().forEach((boxElement) => {
    boxElement.addEventListener('click', myTurn)
  })
}

export const disableEventListener = () => {
  grid().forEach((boxElement) => {
    boxElement.removeEventListener('click', myTurn)
  })
}

const boxes = document.getElementsByClassName('boxes')
const boardState = () => {
  let historyArray = []
  for (let i = 0; i < boxes.length; i++) {
    historyArray.push(boxes[i].innerHTML)
  }
  savedHistories.push([historyArray])
}

const takeTurn = (index, letter) => (grid()[index].innerHTML = letter)

export const myTurn = (event) => {
  takeTurn(boxId(event.target), 'x')
  event.target.classList.add('x')
  boardState()
  if (!checkForVictory()) {
    opponentTurn()
  } else {
    winDisplay.classList.remove('invisible')
    winDisplay.innerText = 'X wins'
    hideWin()
    yourScore++
    yourScoreBoard.innerText = yourScore
  }
}

const opponentChoice = () =>
  boxId(emptyBoxes()[Math.floor(Math.random() * emptyBoxes().length)])

export const opponentTurn = () => {
  disableEventListener()
  setTimeout(() => {
    takeTurn(opponentChoice(), 'o')
    boardState()
    // savedHistories.push([historyArray])
    if (!checkForVictory()) {
      enableEventListeners()
    } else {
      winDisplay.classList.remove('invisible')
      winDisplay.innerText = 'O wins'
      hideWin()
      opponentScore++
      oppScoreboard.innerText = opponentScore
    }
  }, 1000)
}

const oppScoreboard = document.querySelector('.opponent-score')
oppScoreboard.innerText = opponentScore
const yourScoreBoard = document.querySelector('.your-score')
yourScoreBoard.innerText = yourScore
const winDisplay = document.querySelector('.win-display')
const hideWinDisplay = () => winDisplay.classList.add('invisible')
const hideWin = () => winDisplay.addEventListener('click', hideWinDisplay)
