import { loadGame } from './newGame.js'

onload = () => loadGame()

const refresh = () => window.location.reload()
const refreshBtn = document.querySelector('.fa-redo')
refreshBtn.addEventListener('click', refresh)
