import { grid } from './boardState.js'

export const showHistoryBtn = document.querySelector('.show-history')
export const previousBtn = document.querySelector('.previous')
export const nextBtn = document.querySelector('.next')

export let savedHistories = []
export let historyIndex = 0
export let turn = 0

export const resetHistory = () => (savedHistories = [])
export const resetHistoryIndex = () => (historyIndex = 0)
export const resetTurn = () => (turn = 0)

export const showHistory = () => {
  previousBtn.classList.remove('invisible')
  nextBtn.classList.remove('invisible')
  showHistoryBtn.classList.add('invisible')
  grid().forEach((boxElement) => {
    boxElement.innerHTML = ''
    boxElement.classList.remove('win')
    boxElement.classList.remove('x')
  })

  grid().forEach((boxElement) => {
    boxElement.innerHTML = savedHistories[turn][0][historyIndex]
    historyIndex++
  })

  historyIndex = 0
}

export const showPrevious = () => {
  try {
    turn = turn - 1
    grid().forEach((boxElement) => {
      boxElement.innerHTML = savedHistories[turn][0][historyIndex]
      historyIndex++
    })

    historyIndex = 0
  } catch (error) {
    winDisplay.classList.remove('invisible')
    winDisplay.innerText = 'start of game'
    hideWin()
  }
}

export const showNext = () => {
  try {
    turn = turn + 1
    grid().forEach((boxElement) => {
      if (savedHistories[turn][0].length)
        boxElement.innerHTML = savedHistories[turn][0][historyIndex]
      historyIndex++
    })

    historyIndex = 0
  } catch (error) {
    winDisplay.classList.remove('invisible')
    winDisplay.innerText = 'end of game'
    hideWin()
  }
}

previousBtn.addEventListener('click', showPrevious)
nextBtn.addEventListener('click', showNext)
showHistoryBtn.addEventListener('click', showHistory)

const winDisplay = document.querySelector('.win-display')
const hideWinDisplay = () => winDisplay.classList.add('invisible')
const hideWin = () => winDisplay.addEventListener('click', hideWinDisplay)
