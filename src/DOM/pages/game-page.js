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

for (let i = 0; i < 10; i++) {
  const row = document.createElement("div");
  row.classList.add("row");
  player1Board.appendChild(row);
  for (let j = 0; j < 10; j++) {
    const col = document.createElement("div");
    col.classList.add("cell");
    col.dataset.cell = `${i},${j}`;
    // addCellListeners(col);
    row.appendChild(col);
    const indicator = document.createElement("div");
    indicator.classList.add("indicator");
    col.appendChild(indicator);
  }
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

for (let i = 0; i < 10; i++) {
  const row = document.createElement("div");
  row.classList.add("row");
  computerBoard.appendChild(row);
  for (let j = 0; j < 10; j++) {
    const col = document.createElement("div");
    col.classList.add("cell");
    col.dataset.cell = `${i},${j}`;
    // addCellListeners(col);
    row.appendChild(col);
    const indicator = document.createElement("div");
    indicator.classList.add("indicator");
    col.appendChild(indicator);
  }
}

let currentGame;

export function populateGamePage(game) {
  const body = document.querySelector("body");
  body.appendChild(page);
  currentGame = game;
  updatePlayerBoard();
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
        const indicator = document.querySelector(".indicator");
        indicator.classList.add("hit-indicator");
        indicator.style.display = "block";
      }
      if (
        !currentGame.player1.gameboard.board[i][j].ship &&
        currentGame.player1.gameboard.board[i][j].alreadyAttacked
      ) {
        const indicator = document.querySelector(".indicator");
        indicator.classList.add("water-indicator");
        indicator.style.display = "block";
      }
      if (
        currentGame.player1.gameboard.board[i][j].ship &&
        !currentGame.player1.gameboard.board[i][j].alreadyAttacked
      ) {
        const cell = document.querySelector(`[data-cell = "${i},${j}"]`);
        cell.classList.add("ship-cell");
      }
      // if (
      //   currentGame.player1.gameboard.board[i][j].ship &&
      //   !currentGame.player1.gameboard.board[i][j].alreadyAttacked
      // ) {
      //   const cell = document.querySelector(`[data-cell = "${i},${j}"]`);
      //   cell.classList.add("ship-cell");
      // }
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
        const indicator = document.querySelector(".indicator");
        indicator.classList.add("hit-indicator");
        indicator.style.display = "block";
      }
      if (
        !currentGame.computer.gameboard.board[i][j].ship &&
        currentGame.computer.gameboard.board[i][j].alreadyAttacked
      ) {
        const indicator = document.querySelector(".indicator");
        indicator.classList.add("water-indicator");
        indicator.style.display = "block";
      }
    }
  }
}
