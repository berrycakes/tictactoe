const grid = () => Array.from(document.getElementsByClassName('boxes'))

const boxId = (boxElement) => Number.parseInt(boxElement.id.replace('box', ''))

const emptyBoxes = () =>
  grid().filter((boxElement) => boxElement.innerText === '')

export { grid, boxId, emptyBoxes }
