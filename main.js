import { loadGame } from './newGame.js'
import { showHistory } from './showHistory.js'

onload = () => {
  loadGame()
}

const refresh = () => window.location.reload()
const refreshBtn = document.querySelector('.fa-redo')
refreshBtn.addEventListener('click', refresh)
