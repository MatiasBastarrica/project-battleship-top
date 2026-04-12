import { Game } from "../../game.js";
import { clearPage } from "../dom.js";
import { populateShipPlacement } from "./shipPlacement.js";

const page = document.createElement("div");
page.classList.add("page");

const h1 = document.createElement("h1");
h1.textContent = "Battleship";
h1.classList.add("title");
page.appendChild(h1);

const form = document.createElement("form");
page.appendChild(form);

const label = document.createElement("label");
label.setAttribute("for", "player-name");
label.textContent = "Enter player name:";
form.appendChild(label);

const input = document.createElement("input");
input.setAttribute("type", "text");
input.id = "player-name";
input.required = true;
form.appendChild(input);

const startBtn = document.createElement("button");
startBtn.textContent = "Start game";
form.appendChild(startBtn);

startBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (input.checkValidity()) {
    const game = new Game(input.value);
    clearPage();
    populateShipPlacement(game.player1.name, game);
  } else {
    input.reportValidity();
  }
});

export function populateHome() {
  const body = document.querySelector("body");
  body.appendChild(page);
}

export function getElements() {
  return {
    page,
    h1,
    form,
    label,
    input,
    startBtn,
  };
}
