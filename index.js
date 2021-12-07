let savedHistories = [
]

const grid = () => Array.from(document.getElementsByClassName('boxes'))

const boxId = (boxElement) =>
  Number.parseInt(boxElement.id.replace('box', '')) - 1

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
  console.log(historyArray)

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
const takeTurn = (index, letter) => (grid()[index].innerHTML = letter)

let historyArray = [
    [],
    [],
    []
]



const myTurn = (event) => {
  takeTurn(boxId(event.target), 'x')

  historyArray[boxId(event.target)] = 'x'
//   savedHistories.push(historyArray) 
//   console.log(savedHistories)

  if (!checkForVictory()) {
    opponentTurn()
  }
}

const opponentTurn = () => {
  const opponentChoice = () =>
    boxId(emptyBoxes()[Math.floor(Math.random() * emptyBoxes.length)])
  disableEventListeners()
  setTimeout(() => {
    takeTurn(opponentChoice(), 'o')
    historyArray[opponentChoice()] = 'o'
    // savedHistories.push(historyArray) 
    // console.log(savedHistories)
    if (!checkForVictory()) {
      enableEventListeners()
    }
  }, 1000)
}

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
