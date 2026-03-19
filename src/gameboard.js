import { Ship } from "./ship.js";
class Gameboard {
  constructor() {
    this.ships = this.#getShips();
    this.board = this.#getBoard();
  }

  #getShips() {
    return {
      carrier: new Ship(5),
      battleship1: new Ship(4),
      battleship2: new Ship(4),
      destroyer: new Ship(3),
      submarine1: new Ship(3),
      submarine2: new Ship(3),
      patrolBoat1: new Ship(2),
      patrolBoat2: new Ship(2),
      patrolBoat3: new Ship(2),
      patrolBoat4: new Ship(2),
    };
  }

  #getBoard() {
    let board = [];
    for (let i = 0; i < 10; i++) {
      let row = [];
      for (let i = 0; i < 10; i++) {
        row.push({
          ship: null,
        });
      }
      board.push(row);
    }
    return board;
  }
}
