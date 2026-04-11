const page = document.createElement("div");
page.classList.add("page");

const h1 = document.createElement("h1");
h1.textContent = "Battleship";
h1.classList.add("title-small");
page.appendChild(h1);

const reportDisplay = document.createElement("div");
reportDisplay.classList.add("report-dislplay");
page.appendChild(reportDisplay);

const boardsContainer = document.createElement("div");
boardsContainer.classList.add("boards-container");
page.appendChild(boardsContainer);

const player1Container = document.createElement("div");
player1Container.classList.add("player1-container");
boardsContainer.appendChild(player1Container);

const player1Title = document.createElement("h2");
player1Title.textContent = "Friendly waters";
player1Container.appendChild(player1Title);

const player1Board = document.createElement("div");
player1Board.classList.add("player1-board", "board");
player1Container.appendChild(player1Board);

const playerCells = [];

for (let i = 0; i < 10; i++) {
  let rowCells = [];
  const row = document.createElement("div");
  row.classList.add("row");
  player1Board.appendChild(row);
  for (let j = 0; j < 10; j++) {
    const col = document.createElement("div");
    col.classList.add("cell", "player-cell");
    col.dataset.cell = `${i},${j}`;
    rowCells.push(col);
    row.appendChild(col);
    const indicator = document.createElement("div");
    indicator.classList.add("indicator");
    col.appendChild(indicator);
  }
  playerCells.push(rowCells);
}

const computerContainer = document.createElement("div");
computerContainer.classList.add("computer-container");
boardsContainer.appendChild(computerContainer);

const computerTitle = document.createElement("h2");
computerTitle.textContent = "Enemy waters";
computerContainer.appendChild(computerTitle);

const computerBoard = document.createElement("div");
computerBoard.classList.add("computer-board", "board");
computerContainer.appendChild(computerBoard);

const computerCells = [];

for (let i = 0; i < 10; i++) {
  let rowCells = [];
  const row = document.createElement("div");
  row.classList.add("row");
  computerBoard.appendChild(row);
  for (let j = 0; j < 10; j++) {
    const col = document.createElement("div");
    col.classList.add("cell", "computer-cell");
    col.dataset.cell = `${i},${j}`;
    rowCells.push(col);
    addCellListener(col);
    row.appendChild(col);
    const indicator = document.createElement("div");
    indicator.classList.add("indicator");
    col.appendChild(indicator);
  }
  computerCells.push(rowCells);
}

let currentGame;
let waitingStage = false;

export function populateGamePage(game) {
  const body = document.querySelector("body");
  body.appendChild(page);
  currentGame = game;
  //place the computer's ships at random coords
  currentGame.computer.gameboard.placeFixed();
  updatePlayerBoard();
  // console.log(currentGame.computer.gameboard.board);
  // console.log(currentGame.player1.gameboard.board);
}

function updatePlayerBoard() {
  for (let i = 0; i < 10; i++) {
    //row

    for (let j = 0; j < 10; j++) {
      //col
      if (
        currentGame.player1.gameboard.board[i][j].ship &&
        currentGame.player1.gameboard.board[i][j].alreadyAttacked
      ) {
        const cell = playerCells[i][j];
        const indicator = cell.querySelector(".indicator");
        indicator.classList.add("hit-indicator");
        indicator.style.display = "block";
      }
      if (
        !currentGame.player1.gameboard.board[i][j].ship &&
        currentGame.player1.gameboard.board[i][j].alreadyAttacked
      ) {
        const cell = playerCells[i][j];
        const indicator = cell.querySelector(".indicator");
        indicator.classList.add("water-indicator");
        indicator.style.display = "block";
      }
      if (
        currentGame.player1.gameboard.board[i][j].ship &&
        !currentGame.player1.gameboard.board[i][j].alreadyAttacked
      ) {
        const cell = playerCells[i][j];
        cell.classList.add("ship-cell");
      }
    }
  }
}

function updateComputerBoard() {
  for (let i = 0; i < 10; i++) {
    //row

    for (let j = 0; j < 10; j++) {
      //col
      if (
        currentGame.computer.gameboard.board[i][j].ship &&
        currentGame.computer.gameboard.board[i][j].alreadyAttacked
      ) {
        const cell = computerCells[i][j];
        const indicator = cell.querySelector(".indicator");
        indicator.classList.add("hit-indicator");
        indicator.style.display = "block";
      }
      if (
        !currentGame.computer.gameboard.board[i][j].ship &&
        currentGame.computer.gameboard.board[i][j].alreadyAttacked
      ) {
        const cell = computerCells[i][j];
        const indicator = cell.querySelector(".indicator");
        indicator.classList.add("water-indicator");
        indicator.style.display = "block";
      }
    }
  }
}

function addCellListener(cell) {
  cell.addEventListener("click", (e) => {
    if (!currentGame.over && !waitingStage) {
      const row = e.currentTarget.dataset.cell[0];
      const col = e.currentTarget.dataset.cell[2];
      if (!currentGame.computer.gameboard.board[row][col].alreadyAttacked) {
        currentGame.play([row, col]);
        updateComputerBoard();
        waitingStage = true;
        if (!currentGame.over) {
          setTimeout(() => {
            currentGame.play();
            updatePlayerBoard();
            waitingStage = false;
          }, 2000);
        }
      }
    }
  });
}
