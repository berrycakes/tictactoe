import { grid } from './boardState.js'
import { disableEventListener } from './singlePlayer.js'
import { disableEventListeners } from './twoPlayer.js'
import { emptyBoxes } from './boardState.js'
import { showHistoryBtn } from './showHistory.js'

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
]

const isWinningCombo = (arr) =>
  arr.every(
    (boxElement) =>
      boxElement.innerText === arr[0].innerText && boxElement.innerText !== ''
  )

const endGame = (winningSequence) => {
  disableEventListeners()
  disableEventListener()
  showHistoryBtn.classList.remove('invisible')
  winningSequence.forEach((boxElement) => boxElement.classList.add('win'))
}

export const checkForVictory = () => {
  let victory = false

  winningCombos.forEach((combo) => {
    const gridArr = grid()
    const sequence = [gridArr[combo[0]], gridArr[combo[1]], gridArr[combo[2]]]

    if (isWinningCombo(sequence)) {
      victory = true
      endGame(sequence)
    }
  })

  if (emptyBoxes().length === 0) {
    winDisplay.classList.remove('invisible')
    winDisplay.innerText = 'DRAW'
    hideWin()
  } else {
    return victory
  }
}

const winDisplay = document.querySelector('.win-display')
const hideWinDisplay = () => winDisplay.classList.add('invisible')
const hideWin = () => winDisplay.addEventListener('click', hideWinDisplay)
