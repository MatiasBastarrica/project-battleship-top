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
