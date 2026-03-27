import { RealPlayer, Computer } from "./player.js";
import { getRandomNumInRange } from "./utils.js";

export class Game {
  constructor(playerName) {
    this.player1 = new RealPlayer(playerName);
    this.computer = new Computer();
    this.turn = this.player1;
  }

  over = false;
  #computerAttacks = [];
  #computerSinkTurn = null;

  playTurn(coordinate) {
    let opponent = this.turn === this.player1 ? this.computer : this.player1;
    console.log(`${this.turn.name} attcks ${coordinate}`);
    let report = opponent.gameboard.receiveAttack(coordinate);
    if (opponent.gameboard.getAllSunkReport()) {
      this.gameOver(this.turn);
      return;
    }
    this.turn = opponent;
    return report;
  }

  gameOver(winner) {
    this.over = true;
    console.log(`${winner.name} is the winner!!!`);
  }

  playComputerTurn(coordinate = null) {
    this.turn = this.computer;
    if (this.#computerSinkTurn) {
      if (!this.#computerSinkTurn.axis) {
        let adjacentCoordinate =
          this.#computerSinkTurn.adjacentCoordinates.pop();
        let coordinate = adjacentCoordinate.coordinate;
        this.#computerAttacks.push(String(coordinate));
        let report = this.playTurn(coordinate);
        if (
          report.ship === this.#computerSinkTurn.report.ship &&
          report.succesfulAttack
        ) {
          this.#computerSinkTurn.axis = adjacentCoordinate.axis;
          this.#computerSinkTurn.coordinate = coordinate;
          if (report.previouslyAttacked) {
            this.playComputerTurn();
          }
        }
      } else if (!this.#computerSinkTurn.report.ship.sunk) {
        if (this.#computerSinkTurn.axis === "x") {
          let row = this.#computerSinkTurn.coordinate[0];
          let col = this.#computerSinkTurn.coordinate[1];
          if (!this.#computerSinkTurn.changeDirection) {
            this.#computerAttacks.push(String([row, col + 1]));
            // take into account the "previouslyAttacked" property on the report in this line and the others fo the axis
            let report = this.playTurn([row, col + 1]);
            if (
              report.ship === this.#computerSinkTurn.report.ship &&
              report.succesfulAttack
            ) {
              this.#computerSinkTurn.coordinate = [row, col + 1];
              if (report.previouslyAttacked) {
                this.playComputerTurn();
              }
            } else {
              this.#computerSinkTurn.changeDirection = true;
              this.#computerSinkTurn.coordinate =
                this.#computerSinkTurn.ogCoordinate;
            }
          } else {
            this.#computerAttacks.push(String([row, col - 1]));
            let report = this.playTurn([row, col - 1]);
            if (
              report.ship === this.#computerSinkTurn.report.ship &&
              report.succesfulAttack
            ) {
              this.#computerSinkTurn.coordinate = [row, col - 1];
              if (report.previouslyAttacked) {
                this.playComputerTurn();
              }
            }
          }
        } else if (this.#computerSinkTurn.axis === "y") {
          let row = this.#computerSinkTurn.coordinate[0];
          let col = this.#computerSinkTurn.coordinate[1];
          if (!this.#computerSinkTurn.changeDirection) {
            this.#computerAttacks.push(String([row + 1, col]));
            let report = this.playTurn([row + 1, col]);
            if (
              report.ship === this.#computerSinkTurn.report.ship &&
              report.succesfulAttack
            ) {
              this.#computerSinkTurn.coordinate = [row + 1, col];
              if (report.previouslyAttacked) {
                this.playComputerTurn();
              }
            } else {
              this.#computerSinkTurn.changeDirection = true;
              this.#computerSinkTurn.coordinate =
                this.#computerSinkTurn.ogCoordinate;
            }
          } else {
            this.#computerAttacks.push(String([row - 1, col]));
            let report = this.playTurn([row - 1, col]);
            if (
              report.ship === this.#computerSinkTurn.report.ship &&
              report.succesfulAttack
            ) {
              this.#computerSinkTurn.coordinate = [row - 1, col];
              if (report.previouslyAttacked) {
                this.playComputerTurn();
              }
            }
          }
        }
      } else {
        this.#computerSinkTurn = null;
      }
    } else {
      let row;
      let col;
      if (!coordinate) {
        row = getRandomNumInRange(0, 9);
        col = getRandomNumInRange(0, 9);

        while (this.#computerAttacks.includes(String([row, col]))) {
          row = getRandomNumInRange(0, 9);
          col = getRandomNumInRange(0, 9);
        }
      } else {
        row = coordinate[0];
        col = coordinate[1];
      }

      this.#computerAttacks.push(String([row, col]));

      let report = this.playTurn([row, col]);
      if (report.succesfulAttack && !report.ship.sunk) {
        // this.#sinkShipInTurns(report, [row, col]);
        this.#computerSinkTurn = {
          status: true,
          coordinate: [row, col],
          ogCoordinate: [row, col],
          report: report,
          adjacentCoordinates: this.#getAdjacentCoordinates([row, col]),
          axis: null,
          changeDirection: false,
        };
      }
    }
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
}
