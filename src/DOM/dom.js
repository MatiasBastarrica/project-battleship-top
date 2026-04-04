import { populateHome, getElements } from "./pages/home.js";
import { populateShipPlacement } from "./pages/shipPlacement.js";
import { Game } from "../game.js";

export function populate(page) {
  if (page === "home") {
    clearPage();
    populateHome();
  }
}

export function clearPage() {
  const body = document.querySelector("body");
  const firstChild = body.firstElementChild;
  if (firstChild) {
    body.removeChild(firstChild);
  }
}

export function renderPlacementGameboard(player) {
  for (let i = 0; i < 10; i++) {
    //row

    for (let j = 0; j < 10; j++) {
      //col
      if (player.gameboard.board[i][j].ship) {
        const cell = document.querySelector(`[data-cell = "${i},${j}"]`);
        cell.classList.add("ship-cell");
      }
    }
  }
}
