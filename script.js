const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart');
const turnIndicator = document.getElementById('turn-indicator');
const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popup-message');
const closePopupButton = document.getElementById('close-popup');

let currentPlayer = 'X';
let gameActive = true;
let board = Array(9).fill(null);

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleCellClick(e) {
    const index = e.target.getAttribute('data-index');

    if (board[index] || !gameActive) {
        return;
    }

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWin()) {
        showPopup(`${currentPlayer} wins!`);
        gameActive = false;
        return;
    }

    if (board.every(cell => cell)) {
        showPopup("It's a draw!");
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    turnIndicator.textContent = `Current Turn: ${currentPlayer}`;
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === currentPlayer);
    });
}

function restartGame() {
    currentPlayer = 'X';
    gameActive = true;
    board = Array(9).fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
    });
    turnIndicator.textContent = `Current Turn: ${currentPlayer}`;
}

function showPopup(message) {
    popupMessage.textContent = message;
    popup.classList.remove('hidden');
}

function closePopup() {
    popup.classList.add('hidden');
    restartGame();
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
closePopupButton.addEventListener('click', closePopup);
