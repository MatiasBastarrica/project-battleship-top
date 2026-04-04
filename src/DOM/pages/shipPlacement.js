import { Game } from "../../game.js";
import { renderPlacementGameboard } from "../dom.js";

const ships = [
  { name: "patrolBoat", length: 2 },
  { name: "submarine", length: 3 },
  { name: "destroyer", length: 3 },
  { name: "battleship", length: 4 },
  { name: "carrier", length: 5 },
];

let currentAxis = "x";

let currentShip = ships.pop();

let currentGame;

let finished = false;

const page = document.createElement("div");
page.classList.add("page");

const h1 = document.createElement("h1");
h1.textContent = "Battleship";
h1.classList.add("title-small");
page.appendChild(h1);

const h2 = document.createElement("h2");
page.appendChild(h2);

const axisBtn = document.createElement("button");
axisBtn.classList.add("axis-btn");
axisBtn.setAttribute("type", "button");
axisBtn.textContent = "Axis: X";
page.appendChild(axisBtn);

axisBtn.addEventListener("click", () => {
  if (currentAxis === "x") {
    axisBtn.textContent = "Axis: Y";
    currentAxis = "y";
  } else {
    axisBtn.textContent = "Axis: X";
    currentAxis = "x";
  }
});

const board = document.createElement("div");
board.classList.add("board");
page.appendChild(board);

for (let i = 0; i < 10; i++) {
  const row = document.createElement("div");
  row.classList.add("row");
  board.appendChild(row);
  for (let j = 0; j < 10; j++) {
    const col = document.createElement("div");
    col.classList.add("cell");
    col.dataset.cell = `${i},${j}`;
    addCellListeners(col);
    row.appendChild(col);
  }
}

export function populateShipPlacement(playerName, game) {
  const body = document.querySelector("body");
  body.appendChild(page);
  h2.textContent = `${playerName} place your ship`;
  currentGame = game;
}

function addCellListeners(cell) {
  cell.addEventListener("mouseenter", (e) => {
    if (!finished) {
      showPlacement(e.currentTarget.dataset.cell, currentShip, currentAxis);
    }
  });

  cell.addEventListener("mouseleave", (e) => {
    if (!finished) {
      removeHoveredStates();
    }
  });

  cell.addEventListener("click", (e) => {
    let row = Number(e.currentTarget.dataset.cell[0]);
    let col = Number(e.currentTarget.dataset.cell[2]);
    if (
      isLegal(
        `${row},${col}`,
        currentGame.player1.gameboard.board,
        currentAxis,
        currentShip,
      ) &&
      !finished
    ) {
      currentGame.player1.gameboard.placeShip(
        [row, col],
        currentGame.player1.gameboard.ships[currentShip.name],
        currentAxis,
      );
      renderPlacementGameboard(currentGame.player1);
      if (ships.length) {
        currentShip = ships.pop();
      } else {
        // load next page
        finished = true;
      }
    }
  });
}

function showPlacement(startCell, ship, axis) {
  if (isLegal(startCell, currentGame.player1.gameboard.board, axis, ship)) {
    if (axis === "x") {
      for (let i = 0; i < ship.length; i++) {
        let row = Number(startCell[0]);
        let col = Number(startCell[2]) + i;
        const cell = document.querySelector(`[data-cell = "${row},${col}"]`);
        cell.classList.add("cell-hovered");
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        let row = Number(startCell[0]) + i;
        let col = Number(startCell[2]);
        const cell = document.querySelector(`[data-cell = "${row},${col}"]`);
        cell.classList.add("cell-hovered");
      }
    }
  } else {
    const cell = document.querySelector(`[data-cell = "${startCell}"]`);
    cell.classList.add("illegal-cell");
  }
}

function isLegal(coord, board, axis, ship) {
  let row = Number(coord[0]);
  let col = Number(coord[2]);

  if (9 < row < 0 || 9 < col < 0) {
    return false;
  } else if (board[row][col].ship) {
    return false;
  } else if (axis === "x") {
    if (col + ship.length - 1 > 9) {
      return false;
    }
    let allClear;
    for (let i = 0; i < ship.length; i++) {
      if (board[row][col + i].ship) {
        allClear = false;
        break;
      } else {
        allClear = true;
      }
    }
    return allClear;
  } else if (axis === "y") {
    if (row + ship.length - 1 > 9) {
      return false;
    }
    let allClear;
    for (let i = 0; i < ship.length; i++) {
      if (board[row + i][col].ship) {
        allClear = false;
        break;
      } else {
        allClear = true;
      }
    }
    return allClear;
  }
}

function removeHoveredStates() {
  const positionsCells = document.querySelectorAll(".cell-hovered");

  positionsCells.forEach((positionCell) => {
    positionCell.classList.remove("cell-hovered");
  });

  const illegalCells = document.querySelectorAll(".illegal-cell");

  illegalCells.forEach((positionCell) => {
    positionCell.classList.remove("illegal-cell");
  });
}
