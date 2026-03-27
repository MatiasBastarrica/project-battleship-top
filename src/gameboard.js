import { Ship } from "./ship.js";
export class Gameboard {
  constructor() {
    this.ships = this.#getShips();
    this.board = this.#getBoard();
  }

  #missedShots = [];

  #getShips() {
    return {
      carrier: new Ship(5, "carrier"),
      battleship: new Ship(4, "battleship"),
      destroyer: new Ship(3, "destroyer"),
      submarine: new Ship(3, "submarine"),
      patrolBoat: new Ship(2, "patrol boat"),
    };
  }

  #getBoard() {
    let board = [];
    for (let i = 0; i < 10; i++) {
      let row = [];
      for (let i = 0; i < 10; i++) {
        row.push({
          ship: null,
          alreadyAttacked: false,
        });
      }
      board.push(row);
    }
    return board;
  }

  placeShip(startCoordinate, ship, orientation) {
    let row = startCoordinate[0];
    let col = startCoordinate[1];

    if (!this.#isLegal(startCoordinate, orientation, ship.length)) {
      throw new Error("You can't place your ship there!!!");
    }

    if (orientation === "x") {
      for (let i = 0; i < ship.length; i++) {
        this.board[row][col + i].ship = ship;
      }
    } else if (orientation === "y") {
      for (let i = 0; i < ship.length; i++) {
        this.board[row + i][col].ship = ship;
      }
    }
  }

  receiveAttack(coordinate) {
    let row = coordinate[0];
    let col = coordinate[1];

    if (!this.board[row][col].alreadyAttacked) {
      if (this.board[row][col].ship) {
        this.board[row][col].ship.hit();
        this.board[row][col].alreadyAttacked = true;
        console.log(`A ${this.board[row][col].ship.type} has been hit!`);
        return {
          succesfulAttack: true,
          ship: this.board[row][col].ship,
          previouslyAttacked: false,
        };
      } else {
        this.#missedShots.push(String(coordinate));
        console.log("Water!");
        return {
          succesfulAttack: false,
          previouslyAttacked: false,
        };
      }
    } else {
      return {
        succesfulAttack: true,
        previouslyAttacked: true,
        ship: this.board[row][col].ship,
      };
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

  placeAllRandom() {
    const shipTypes = Object.keys(this.ships);

    for (let i = 0; i < shipTypes.length; i++) {
      let ship = this.ships[shipTypes[i]];
      let orientation = this.#getRandomNumInRange(0, 1) ? "y" : "x";
      let row;
      let col;
      if (orientation === "x") {
        let legalCoordinate;

        while (!legalCoordinate) {
          col = this.#getRandomNumInRange(0, 9 - ship.length + 1);
          row = this.#getRandomNumInRange(0, 9);

          legalCoordinate = this.#isLegal([row, col], orientation, ship.length);
        }
      } else if (orientation === "y") {
        let legalCoordinate;

        while (!legalCoordinate) {
          row = this.#getRandomNumInRange(0, 9 - ship.length + 1);
          col = this.#getRandomNumInRange(0, 9);

          legalCoordinate = this.#isLegal([row, col], orientation, ship.length);
        }
      }

      this.placeShip([row, col], ship, orientation);
    }
  }

  #getRandomNumInRange(min, max) {
    let random = Math.floor(Math.random() * (max - min + 1)) + min;
    return random;
  }

  #isLegal(coordinate, orientation, shipLength) {
    let row = coordinate[0];
    let col = coordinate[1];

    if (9 < row < 0 || 9 < col < 0) {
      return false;
    } else if (this.board[row][col].ship) {
      return false;
    } else if (orientation === "x") {
      if (col + shipLength - 1 > 9) {
        return false;
      }
      let allClear;
      for (let i = 0; i < shipLength; i++) {
        if (this.board[row][col + i].ship) {
          allClear = false;
          break;
        } else {
          allClear = true;
        }
      }
      return allClear;
    } else if (orientation === "y") {
      if (row + shipLength - 1 > 9) {
        throw new Error("You can't place the ship here!");
      }
      let allClear;
      for (let i = 0; i < shipLength; i++) {
        if (this.board[row + i][col].ship) {
          allClear = false;
          break;
        } else {
          allClear = true;
        }
      }
      return allClear;
    }
  }
}
