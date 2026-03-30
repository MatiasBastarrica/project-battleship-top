import { Gameboard } from "./gameboard.js";
import { getRandomNumInRange } from "./utils.js";

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

  playTurn(opponent, cooridnate) {
    opponent.gameboard.receiveAttack(cooridnate, this.name);
  }
}

export class Computer extends Player {
  constructor() {
    super("Computer");
  }

  #currentShip = {
    ship: null,
    adjacentCoordinates: null,
    axis: null,
    axisCoordinates: null,
  };
  #nextShips = [];

  #enemyData = {
    carrier: {
      ship: null,
      locations: [],
    },
    battleship: {
      ship: null,
      locations: [],
    },
    destroyer: {
      ship: null,
      locations: [],
    },
    submarine: {
      ship: null,
      locations: [],
    },
    "patrol boat": {
      ship: null,
      locations: [],
    },
  };

  playTurn(opponent, coordinate = null) {
    if (this.#currentShip.ship && !this.#currentShip.ship.sunk) {
      if (!this.#currentShip.axis) {
        if (
          this.#enemyData[this.#currentShip.ship.type].locations.length >= 2
        ) {
          this.#currentShip.axis = this.#getShipAxis(
            this.#currentShip.ship.type,
          );
          this.#currentShip.axisCoordinates = this.#getAxisCoordinates(
            this.#currentShip.ship.type,
            this.#currentShip.axis,
          );
        } else {
          let adjacentCoordinate = this.#currentShip.adjacentCoordinates.pop();
          let result = opponent.gameboard.receiveAttack(
            adjacentCoordinate.coordinate,
            this.name,
          );
          if (result) {
            if (result.alreadyAttacked) {
              this.playTurn(opponent);
            } else if (result.ship === this.#currentShip.ship) {
              this.#enemyData[result.ship.type].locations.push(
                result.coordinate,
              );
              if (result.ship.length === 2 && result.ship.sunk) {
                this.#reset(this.#currentShip);
              } else {
                this.#currentShip.axis = adjacentCoordinate.axis;
                this.#currentShip.axisCoordinates = this.#getAxisCoordinates(
                  this.#currentShip.ship.type,
                  this.#currentShip.axis,
                );
              }
            } else {
              this.#enemyData[result.ship.type].ship = result.ship;
              this.#enemyData[result.ship.type].locations.push(
                result.coordinate,
              );
              this.#nextShips.push(result.ship.type);
            }
          }
        }
      } else if (this.#currentShip.axis === "x") {
        let coordinate = this.#currentShip.axisCoordinates.pop();
        let result = opponent.gameboard.receiveAttack(coordinate, this.name);
        if (result) {
          if (result.alreadyAttacked) {
            this.playTurn(opponent);
          } else if (result.ship === this.#currentShip.ship) {
            this.#enemyData[result.ship.type].locations.push(result.coordinate);
            if (result.ship.sunk) {
              this.#reset(this.#currentShip);
            }
          } else {
            this.#enemyData[result.ship.type].ship = result.ship;
            this.#enemyData[result.ship.type].locations.push(result.coordinate);
            this.#nextShips.push(result.ship.type);
          }
        }
      } else if (this.#currentShip.axis === "y") {
        let coordinate = this.#currentShip.axisCoordinates.pop();
        let result = opponent.gameboard.receiveAttack(coordinate, this.name);
        if (result) {
          if (result.alreadyAttacked) {
            this.playTurn(opponent);
          } else if (result.ship === this.#currentShip.ship) {
            this.#enemyData[result.ship.type].locations.push(result.coordinate);
            if (result.ship.sunk) {
              this.#reset(this.#currentShip);
            }
          } else {
            this.#enemyData[result.ship.type].ship = result.ship;
            this.#enemyData[result.ship.type].locations.push(result.coordinate);
            this.#nextShips.push(result.ship.type);
          }
        }
      }
    } else {
      if (this.#nextShips.length) {
        this.#reset(this.#currentShip);
        let shipType = this.#nextShips.pop();

        this.#currentShip.ship = this.#enemyData[shipType].ship;
        this.#currentShip.adjacentCoordinates = this.#getAdjacentCoordinates(
          this.#enemyData[shipType].locations[0],
        );
        this.playTurn(opponent);
      } else {
        let row;
        let col;
        if (!coordinate) {
          row = getRandomNumInRange(0, 9);
          col = getRandomNumInRange(0, 9);

          while (opponent.gameboard.board[row][col].alreadyAttacked) {
            row = getRandomNumInRange(0, 9);
            col = getRandomNumInRange(0, 9);
          }
        } else {
          row = coordinate[0];
          col = coordinate[1];
        }

        let result = opponent.gameboard.receiveAttack([row, col], this.name);
        if (result) {
          if (result.alreadyAttacked) {
            this.playTurn(opponent);
          } else {
            this.#enemyData[result.ship.type].ship = result.ship;
            this.#enemyData[result.ship.type].locations.push(result.coordinate);
            this.#currentShip.ship = result.ship;
            this.#currentShip.adjacentCoordinates =
              this.#getAdjacentCoordinates([row, col]);
          }
        }
      }
    }
  }

  #getShipAxis(shipType) {
    let coor1 = this.#enemyData[shipType].locations[0];
    let coor2 = this.#enemyData[shipType].locations[1];

    if (coor1[0] === coor2[0]) {
      return "x";
    } else {
      return "y";
    }
  }

  #getAxisCoordinates(shipType, axis) {
    let locations = this.#enemyData[shipType].locations;
    let axisCoordinates = [];

    let shipLength = this.#enemyData[shipType].ship.length;

    let coordinatesLeft = shipLength - locations.length;

    if (axis === "x") {
      locations.forEach((location) => {
        let row = location[0];
        let col = location[1];

        for (let i = 1; i <= coordinatesLeft; i++) {
          let newCoor = [row, col + i];
          if (
            !this.#isInArr(newCoor, locations) &&
            !this.#isInArr(newCoor, axisCoordinates) &&
            !this.#isOutOfBounds(newCoor)
          ) {
            axisCoordinates.push(newCoor);
          }
        }

        for (let i = 1; i <= coordinatesLeft; i++) {
          let newCoor = [row, col - i];
          if (
            !this.#isInArr(newCoor, locations) &&
            !this.#isInArr(newCoor, axisCoordinates) &&
            !this.#isOutOfBounds(newCoor)
          ) {
            axisCoordinates.push(newCoor);
          }
        }
      });
    } else {
      locations.forEach((location) => {
        let row = location[0];
        let col = location[1];

        for (let i = 1; i <= coordinatesLeft; i++) {
          let newCoor = [row + i, col];
          if (
            !this.#isInArr(newCoor, locations) &&
            !this.#isInArr(newCoor, axisCoordinates) &&
            !this.#isOutOfBounds(newCoor)
          ) {
            axisCoordinates.push(newCoor);
          }
        }

        for (let i = 1; i <= coordinatesLeft; i++) {
          let newCoor = [row - i, col];
          if (
            !this.#isInArr(newCoor, locations) &&
            !this.#isInArr(newCoor, axisCoordinates) &&
            !this.#isOutOfBounds(newCoor)
          ) {
            axisCoordinates.push(newCoor);
          }
        }
      });
    }

    return axisCoordinates;
  }

  #getAdjacentCoordinates(coordinate) {
    let arr = [];
    let row = coordinate[0];
    let col = coordinate[1];
    if (col - 1 >= 0) {
      arr.push({ coordinate: [row, col - 1], axis: "x" });
    }
    if (row + 1 <= 9) {
      arr.push({ coordinate: [row + 1, col], axis: "y" });
    }
    if (col + 1 <= 9) {
      arr.push({ coordinate: [row, col + 1], axis: "x" });
    }
    if (row - 1 >= 0) {
      arr.push({ coordinate: [row - 1, col], axis: "y" });
    }
    return arr;
  }

  #isInArr(coor, arr) {
    let row = coor[0];
    let col = coor[1];

    let isPresent = false;

    for (let i = 0; i < arr.length; i++) {
      let coor = arr[i];
      if (coor[0] === row && coor[1] === col) {
        isPresent = true;
        break;
      }
    }
    return isPresent;
  }

  #isOutOfBounds(coor) {
    let row = coor[0];
    let col = coor[1];

    if (9 >= row && row >= 0 && 9 >= col && col >= 0) {
      return false;
    } else {
      return true;
    }
  }

  #reset(currentShip) {
    currentShip.ship = null;
    currentShip.adjacentCoordinates = null;
    currentShip.axis = null;
    currentShip.axisCoordinates = null;
  }
}
