import { Gameboard } from "./gameboard.js";

class Player {
  constructor(name) {
    this.name = name;
    this.gameboard = new Gameboard();
  }
}

export class RealPlayer extends Player {
  constructor(name) {
    super(name);
  }
}

export class Computer extends Player {
  constructor() {
    super("Computer");
  }
}
