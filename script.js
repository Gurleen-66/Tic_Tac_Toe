let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let isGameOver = false;

const cells = document.querySelectorAll('.cell');
const turnIndicator = document.querySelector('.turn-indicator');
const restartButton = document.querySelector('.restart-button');

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.getAttribute('data-index');

    if (gameBoard[cellIndex] !== '' || isGameOver) {
        return;
    }

    updateCell(cell, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    turnIndicator.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
    let winner = null;

    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            winner = gameBoard[a];
            break;
        }
    }

    if (winner) {
        turnIndicator.textContent = `Player ${winner} wins!`;
        isGameOver = true;
    } else if (!gameBoard.includes('')) {
        turnIndicator.textContent = 'It\'s a draw!';
        isGameOver = true;
    }
}

function restartGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
    });
    currentPlayer = 'X';
    turnIndicator.textContent = `Player X's turn`;
    isGameOver = false;
}
