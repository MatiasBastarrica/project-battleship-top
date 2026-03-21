import { Gameboard } from "./gameboard.js";

class Player {
  constructor(name = "Computer") {
    this.gameboard = new Gameboard();
  }
}
