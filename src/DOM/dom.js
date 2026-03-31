import { populateHome, getElements } from "./pages/home.js";
import { Game } from "../game.js";

export function populate(page) {
  if (page === "home") {
    populateHome();
    const elements = getElements();
    elements.startBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (elements.input.checkValidity) {
        const game = new Game(elements.input.value);
        console.log("game started");
      }
    });
  }
}
