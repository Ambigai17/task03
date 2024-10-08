const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellClick(e) {
  const cell = e.target;
  const index = cell.getAttribute('data-index');

  if (board[index] !== '' || !gameActive) {
    return;
  }

  updateCell(cell, index);
  checkWinner();
}

function updateCell(cell, index) {
  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (!board.includes('')) {
    statusText.textContent = 'Draw!';
    gameActive = false;
    return;
  }

  switchPlayer();
}

function resetGame() {
  currentPlayer = 'X';
  board = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  cells.forEach(cell => cell.textContent = '');
  statusText.textContent = '';
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
