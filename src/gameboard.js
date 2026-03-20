import { Ship } from "./ship.js";
export class Gameboard {
  constructor() {
    this.ships = this.#getShips();
    this.board = this.#getBoard();
  }

  #missedShots = [];

  #getShips() {
    return {
      carrier: new Ship(5),
      battleship: new Ship(4),
      destroyer: new Ship(3),
      submarine: new Ship(3),
      patrolBoat: new Ship(2),
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

  placeShip(startCoordinate, ship, orientation) {
    let row = startCoordinate[0];
    let col = startCoordinate[1];

    if (orientation === "horizontal") {
      for (let i = 0; i < ship.length; i++) {
        this.board[row][col + i].ship = ship;
      }
    } else if (orientation === "vertical") {
      for (let i = 0; i < ship.length; i++) {
        this.board[row + i][col].ship = ship;
      }
    }
  }

  receiveAttack(coordinate) {
    let row = coordinate[0];
    let col = coordinate[1];

    if (this.board[row][col].ship) {
      this.board[row][col].ship.hit();
    } else {
      this.#missedShots.push(String(coordinate));
    }
  }

  getAllSunkReport() {
    let shipsArr = Object.values(this.ships);
    let allSunk;

    for (let i = 0; i < shipsArr.length; i++) {
      const ship = shipsArr[i];
      if (ship.isSunk()) {
        allSunk = true;
      } else {
        allSunk = false;
        break;
      }
    }

    return allSunk;
  }
}

let gameboard1 = new Gameboard();
gameboard1.placeShip([0, 0], gameboard1.ships.carrier, "horizontal");
gameboard1.placeShip([1, 0], gameboard1.ships.patrolBoat, "horizontal");
gameboard1.receiveAttack([0, 0]);
gameboard1.receiveAttack([0, 1]);
gameboard1.receiveAttack([1, 0]);
gameboard1.receiveAttack([1, 1]);
