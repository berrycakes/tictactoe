import { grid, boxId } from './boardState.js'
import { checkForVictory } from './winningConditions.js'
import { savedHistories } from './showHistory.js'

let yourScore = 0
let opponentScore = 0

export const boxes = document.getElementsByClassName('boxes')
export const boardState = () => {
  let historyArray = []
  for (let i = 0; i < boxes.length; i++) {
    historyArray.push(boxes[i].innerHTML)
  }
  savedHistories.push([historyArray])
}

export const enableFirstEventListener = () => {
  grid().forEach((boxElement) => {
    boxElement.addEventListener('click', firstPlayerTurn)
  })
}

export const enableSecondEventListener = () => {
  grid().forEach((boxElement) => {
    boxElement.addEventListener('click', secondPlayerTurn)
  })
}

export const disableEventListeners = () => {
  grid().forEach((boxElement) => {
    boxElement.removeEventListener('click', firstPlayerTurn)
    boxElement.removeEventListener('click', secondPlayerTurn)
  })
}

const takeTurn = (index, letter) => (grid()[index].innerHTML = letter)

export const firstPlayerTurn = (event) => {
  takeTurn(boxId(event.target), 'x')
  event.target.classList.add('x')
  boardState()
  if (!checkForVictory()) {
    disableEventListeners()
    enableSecondEventListener()
  } else {
    winDisplay.classList.remove('invisible')
    winDisplay.innerText = 'X wins'
    hideWin()
    yourScore++
    yourScoreBoard.innerText = yourScore
  }
}

export const secondPlayerTurn = (event) => {
  takeTurn(boxId(event.target), 'o')
  event.target.classList.add('o')
  boardState()
  if (!checkForVictory()) {
    disableEventListeners()
    enableFirstEventListener()
  } else {
    winDisplay.classList.remove('invisible')
    winDisplay.innerText = 'O wins'
    hideWin()
    opponentScore++
    oppScoreboard.innerText = opponentScore
  }
}

const oppScoreboard = document.querySelector('.opponent-score')
oppScoreboard.innerText = opponentScore
const yourScoreBoard = document.querySelector('.your-score')
yourScoreBoard.innerText = yourScore
const winDisplay = document.querySelector('.win-display')
const hideWinDisplay = () => winDisplay.classList.add('invisible')
const hideWin = () => winDisplay.addEventListener('click', hideWinDisplay)
