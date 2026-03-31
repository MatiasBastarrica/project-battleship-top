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
form.appendChild(label);

const input = document.createElement("input");
input.setAttribute("type", "text");
input.id = "player-name";
input.required = true;
form.appendChild(input);

const startBtn = document.createElement("button");
startBtn.textContent = "Start game";
form.appendChild(startBtn);

export function populateHome() {
  const body = document.querySelector("body");
  body.appendChild(page);
}
