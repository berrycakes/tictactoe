import { grid } from './boardState.js'
import { enableEventListeners, opponentTurn } from './singlePlayer.js'
import {
  enableFirstEventListener,
  enableSecondEventListener,
} from './twoPlayer.js'
import { showHistoryBtn, previousBtn, nextBtn } from './showHistory.js'
import { resetHistory, resetHistoryIndex, resetTurn } from './showHistory.js'

const newGamebtn = document.querySelector('.new-game')
const playerModeBtn = document.querySelector('.player-mode')
const computerModeBtn = document.querySelector('.computer-mode')
const xFirstPlayerBtn = document.querySelector('.x-first-player')
const oFirstPlayerBtn = document.querySelector('.o-first-player')
const xFirstComputerBtn = document.querySelector('.x-first-computer')
const oFirstComputerBtn = document.querySelector('.o-first-computer')
const gameContainer = document.querySelector('#game-container')
const winDisplay = document.querySelector('.win-display')

const modeOption = document.querySelector('#mode-option')
const turnOptionPlayer = document.querySelector('#turn-option-player')
const turnOptionComputer = document.querySelector('#turn-option-computer')

export const loadGame = () => {
  modeOption.classList.remove('invisible')
  turnOptionPlayer.classList.add('invisible')
  turnOptionComputer.classList.add('invisible')
  gameContainer.classList.add('invisible')
}

let mode = 'x-first-computer'

export const newGame = () => {
  grid().forEach((boxElement) => {
    boxElement.innerHTML = ''
    boxElement.classList.remove('win')
    boxElement.classList.remove('x')
  })
  showHistoryBtn.classList.add('invisible')
  previousBtn.classList.add('invisible')
  nextBtn.classList.add('invisible')
  winDisplay.classList.add('invisible')
  resetHistory()
  resetHistoryIndex()
  resetTurn()
  if (mode === 'x-first-player') {
    xFirstPlayer()
  }
  if (mode === 'o-first-player') {
    oFirstPlayer()
  }
  if (mode === 'x-first-computer') {
    xFirstComputer()
  }
  if (mode === 'o-first-computer') {
    oFirstComputer()
  }
}

const playerMode = () => {
  modeOption.classList.add('invisible')
  turnOptionPlayer.classList.remove('invisible')
}
const computerMode = () => {
  modeOption.classList.add('invisible')
  turnOptionComputer.classList.remove('invisible')
}

const xFirstPlayer = () => {
  gameContainer.classList.remove('invisible')
  turnOptionPlayer.classList.add('invisible')
  mode = 'x-first-player'
  enableFirstEventListener()
}
const oFirstPlayer = () => {
  gameContainer.classList.remove('invisible')
  turnOptionPlayer.classList.add('invisible')
  mode = 'o-first-player'
  enableSecondEventListener()
}

const xFirstComputer = () => {
  gameContainer.classList.remove('invisible')
  turnOptionComputer.classList.add('invisible')
  mode = 'x-first-computer'
  enableEventListeners()
}
const oFirstComputer = () => {
  gameContainer.classList.remove('invisible')
  turnOptionComputer.classList.add('invisible')
  mode = 'o-first-computer'
  opponentTurn()
}

playerModeBtn.addEventListener('click', playerMode)
computerModeBtn.addEventListener('click', computerMode)
xFirstPlayerBtn.addEventListener('click', xFirstPlayer)
oFirstPlayerBtn.addEventListener('click', oFirstPlayer)
xFirstComputerBtn.addEventListener('click', xFirstComputer)
oFirstComputerBtn.addEventListener('click', oFirstComputer)
newGamebtn.addEventListener('click', newGame)
