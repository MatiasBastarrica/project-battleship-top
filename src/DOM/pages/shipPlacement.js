import { Game } from "../../game.js";

const page = document.createElement("div");
page.classList.add("page");

const h1 = document.createElement("h1");
h1.textContent = "Battleship";
h1.classList.add("title-small");
page.appendChild(h1);

const h2 = document.createElement("h2");
page.appendChild(h2);

const axisBtn = document.createElement("button");
axisBtn.setAttribute("type", "button");
axisBtn.textContent = "Axis: X";
page.appendChild(axisBtn);

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
    row.appendChild(col);
  }
}

export function populateShipPlacement(playerName) {
  const body = document.querySelector("body");
  body.appendChild(page);
  h2.textContent = `${playerName} place your ship`;
}
