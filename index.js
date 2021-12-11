window.addEventListener('load', (event) => {
  newGame()
});

// array for saved moves per turn
let savedHistories = []

const grid = () => Array.from(document.getElementsByClassName('boxes'))

const boxId = (boxElement) => Number.parseInt(boxElement.id.replace('box', ''))

const emptyBoxes = () =>
  grid().filter((boxElement) => boxElement.innerText === '')

//   Winning conditions
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
  winningSequence.forEach((boxElement) => boxElement.classList.add('win'))
}

const checkForVictory = () => {
  let victory = false
  // console.table(historyArray)

  winningCombos.forEach((combo) => {
    const gridArr = grid()
    const sequence = [gridArr[combo[0]], gridArr[combo[1]], gridArr[combo[2]]]

    if (isWinningCombo(sequence)) {
      victory = true
      endGame(sequence)
    }
  })

  return victory
}

// Player turns
let yourScore = 0
let opponentScore = 0
const boxes = document.getElementsByClassName('boxes')
const boardState = () => {
  let historyArray = []
  for (let i = 0; i < boxes.length; i++) {
    historyArray.push(boxes[i].innerHTML)
  }
  savedHistories.push([historyArray])
}

const takeTurn = (index, letter) => (grid()[index].innerHTML = letter)

const myTurn = (event) => {
  takeTurn(boxId(event.target), 'x')
  event.target.classList.add('x')
  boardState()
  if (!checkForVictory()) {
    opponentTurn()
  } else {
    yourScore++
    yourScoreBoard.innerText = yourScore
    
  }
}

const opponentChoice = () =>
  boxId(emptyBoxes()[Math.floor(Math.random() * emptyBoxes.length)])

const opponentTurn = () => {
  disableEventListeners()
  setTimeout(() => {
    takeTurn(opponentChoice(), 'o')
    boardState()
    // savedHistories.push([historyArray])
    if (!checkForVictory()) {
      enableEventListeners()
    } else {
      opponentScore++
      oppScoreboard.innerText = opponentScore
    }
  }, 1000)
}

const oppScoreboard = document.querySelector('.opponent-score')
oppScoreboard.innerText = opponentScore
const yourScoreBoard = document.querySelector('.your-score')
yourScoreBoard.innerText = yourScore

// Show history
const showHistoryBtn = document.querySelector('.show-history')
const previousBtn = document.querySelector('.previous')
const nextBtn = document.querySelector('.next')
let historyIndex = 0
let turn = 0

const showHistory = () => {
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

const showPrevious = () => {
  turn = turn - 1 
  grid().forEach((boxElement) => {
    boxElement.innerHTML = savedHistories[turn][0][historyIndex]
    historyIndex++
  })

  historyIndex = 0
}
const showNext = () => {
  turn = turn + 1
  grid().forEach((boxElement) => {
    if (savedHistories[turn][0].length)
    boxElement.innerHTML = savedHistories[turn][0][historyIndex]
    historyIndex++
  })

  historyIndex = 0
}

previousBtn.addEventListener('click', showPrevious)
nextBtn.addEventListener('click', showNext)

showHistoryBtn.addEventListener('click', showHistory)


// New Game
const newGamebtn = document.querySelector('.new-game')

const playerModeBtn = document.querySelector('.player-mode')
const computerModeBtn = document.querySelector('.computer-mode')

const xFirstBtn = document.querySelector('.x-first')
const oFirstBtn = document.querySelector('.o-first')

const newGame = () => {
  grid().forEach((boxElement) => {
    boxElement.innerHTML = ''
    boxElement.classList.remove('win')
    boxElement.classList.remove('x')
  })
  savedHistories = []
  let historyIndex = 0
  let turn = 0
  }

const playerMode = () => enableEventListeners()
const computerMode = () => enableEventListeners()

const xFirst = () => enableEventListeners()
const oFirst = () => opponentTurn()

newGamebtn.addEventListener('click', newGame)

playerModeBtn.addEventListener('click', playerMode)
computerModeBtn.addEventListener('click', computerMode)
xFirstBtn.addEventListener('click', xFirst)
oFirstBtn.addEventListener('click', oFirst)



// Enable and disable event listeners
const enableEventListeners = () => {
  grid().forEach((boxElement) => {
    boxElement.addEventListener('click', myTurn)
  })
}

const disableEventListeners = () => {
  grid().forEach((boxElement) => {
    boxElement.removeEventListener('click', myTurn)
  })
}

enableEventListeners()
