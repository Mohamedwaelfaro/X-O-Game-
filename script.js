let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
const resultElement = document.getElementById('result');
const resetButton = document.querySelector('button');
const ticTacToeCells = document.querySelectorAll('.cell');

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function makeMove(cellIndex) {
    if (gameBoard[cellIndex] === '' && gameActive) {
        gameBoard[cellIndex] = currentPlayer;
        ticTacToeCells[cellIndex].textContent = currentPlayer;
        if (checkWin()) {
            resultElement.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
        } else if (gameBoard.indexOf('') === -1) {
            resultElement.textContent = "It's a draw!";
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWin() {
    const winCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (const combination of winCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            const winLine = document.getElementById('win-line');
            if (a === 0 && c === 2) {
                winLine.style.transform = 'rotate(0deg)';
            } else if (a === 0 && c === 6) {

                winLine.style.transform = 'rotate(90deg)';
            } else if (a === 0 && c === 8) {
                winLine.style.transform = 'rotate(45deg)';
            }
            winLine.style.opacity = '1';
            return true;
        }
    }
    return false;
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    resultElement.textContent = '';
    ticTacToeCells.forEach(cell => {
        cell.textContent = '';
        cell.style.backgroundColor = getRandomColor();
    });
}

resetGame();
resetButton.addEventListener('click', resetGame);
