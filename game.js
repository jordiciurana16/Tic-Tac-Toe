// VARABLE DECLARATION

const CROSS = 'cross';
const CIRCLE = 'circle';

const WIN = [ // array of possible winning conditions
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8],
    [2, 4, 6]
];

const cellElements = document.querySelectorAll('[data-cell]'); // selects all the cells
const gameBoard = document.getElementById("game-board"); // gets the game board
const winningMessageElement = document.getElementById("winningMessage"); // gets the game board
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
let turn; // determines whose turn it is
const restart = document.getElementById("restartButton");



startGame();

restart.addEventListener('click', startGame);

function startGame() {
    turn = false;
    cellElements.forEach(cell => { // for each cell applies a function that reacts once being clicked
        cell.classList.remove(CROSS);
        cell.classList.remove(CIRCLE);
        cell.removeEventListener('click', clickCell)
        cell.addEventListener('click', clickCell, { once: true }) 
    })

    boardHoverEffect();
    winningMessageElement.classList.remove('show');
}

// FUNCTIONS

function clickCell(e) { // function that reacts once being clicked
    const cell = e.target; // the cell clicked
    const currentTurn = turn ? CIRCLE : CROSS // if currentTurn is true, takes CROSS, if not, takes CIRCLE
    placeMark(cell, currentTurn) // call place mark function
    if (checkWin(currentTurn)) { // cal win check function
        endGame(false);
    } else if (isDraw()){
        endGame(true);
    } else {
        swapTurn(); // call swap turn function
        boardHoverEffect(); // call hover effect function
    }
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = "It's a draw!";
    } else {
        winningMessageTextElement.innerText = `${turn ? "O" : "X"}\'s win `;
    }
    winningMessageElement.classList.add('show');
}

function placeMark(cell, currentTurn) { // place mark function
    cell.classList.add(currentTurn) // add cross or circle in the cell class
}

function swapTurn(currentTurn) { // swap turn function
    turn = !turn;
}

function boardHoverEffect() { // hover effect function
    gameBoard.classList.remove(CROSS); // remove class cross from gameBoard
    gameBoard.classList.remove(CIRCLE); // remove class cross from gameBoard
    if (turn) {
        gameBoard.classList.add(CIRCLE);
    } else {
        gameBoard.classList.add(CROSS);
    }
}

function checkWin(currentTurn) { // check win function with the current class
    return WIN.some(combinations => { // executes if there is a winning combination
        return combinations.every(index =>{ // for each combination, check the class
            return cellElements[index].classList.contains(currentTurn) // if current turn is in all the cells of a winning combination
        })
    })
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(CROSS) ||
        cell.classList.contains(CIRCLE)
        draw = true;
    })
}