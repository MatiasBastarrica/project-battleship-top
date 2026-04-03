import { populateHome, getElements } from "./pages/home.js";
import { populateShipPlacement } from "./pages/shipPlacement.js";
import { Game } from "../game.js";

export function populate(page) {
  if (page === "home") {
    clearPage();
    populateHome();
    const elements = getElements();
    elements.startBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (elements.input.checkValidity) {
        const game = new Game(elements.input.value);
        // console.log(`Playing as ${game.player1.name}`);
        clearPage();
        populateShipPlacement(game.player1.name);
      }
    });
  }
}

function clearPage() {
  const body = document.querySelector("body");
  const firstChild = body.firstElementChild;
  if (firstChild) {
    body.removeChild(firstChild);
  }
}
