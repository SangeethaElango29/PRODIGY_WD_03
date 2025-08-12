const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("game-board");
const statusMessage = document.getElementById("status-message");
const restartButton = document.getElementById("restart-button");

let isXTurn = true;

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

function startGame() {
  isXTurn = true;
  cells.forEach(cell => {
    cell.classList.remove("taken");
    cell.textContent = "";
    cell.addEventListener("click", handleClick, { once: true });
  });
  statusMessage.textContent = "Player X's turn";
}

function handleClick(e) {
  const cell = e.target;
  const currentPlayer = isXTurn ? "X" : "O";
  cell.textContent = currentPlayer;
  cell.classList.add("taken");

  if (checkWin(currentPlayer)) {
    statusMessage.textContent = `Player ${currentPlayer} wins!`;
    endGame();
    return;
  }

  if (isDraw()) {
    statusMessage.textContent = "It's a Draw!";
    return;
  }

  isXTurn = !isXTurn;
  statusMessage.textContent = `Player ${isXTurn ? "X" : "O"}'s turn`;
}

function checkWin(player) {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cells[index].textContent === player;
    });
  });
}

function isDraw() {
  return [...cells].every(cell => cell.textContent);
}

function endGame() {
  cells.forEach(cell => {
    cell.removeEventListener("click", handleClick);
  });
}

restartButton.addEventListener("click", startGame);

startGame();
