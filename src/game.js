import { RealPlayer, Computer } from "./player.js";
import { getRandomNumInRange } from "./utils.js";

export class Game {
  constructor(playerName) {
    this.player1 = new RealPlayer(playerName);
    this.computer = new Computer();
    this.turn = this.player1;
  }

  over = false;

  play(coordinate, turn) {
    if (!turn && this.turn === this.player1) {
      this.player1.playTurn(this.computer, coordinate);
      this.checkGameStatus(this.computer);
      this.turn = this.computer;
    } else {
      this.computer.playTurn(this.player1, coordinate);
      this.checkGameStatus(this.player1);
      this.turn = this.player1;
    }
  }

  checkGameStatus(opponent) {
    if (opponent.gameboard.getAllSunkReport()) {
      this.gameOver(this.turn);
      return;
    }
  }

  gameOver(winner) {
    this.over = true;
    console.log(`${winner.name} is the winner!!!`);
  }
}
