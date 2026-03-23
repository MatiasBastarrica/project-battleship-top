import { RealPlayer, Computer } from "./player.js";

export class Game {
  constructor(playerName) {
    this.player1 = new RealPlayer(playerName);
    this.computer = new Computer();
    this.turn = this.player1;
  }

  over = false;

  playTurn(coordinate) {
    let opponent = this.turn === this.player1 ? this.computer : this.player1;
    console.log(`${this.turn.name} attcks ${coordinate}`);
    opponent.gameboard.receiveAttack(coordinate);
    if (opponent.gameboard.getAllSunkReport()) {
      this.gameOver(this.turn);
      return;
    }
    this.turn = opponent;
  }

  gameOver(winner) {
    this.over = true;
    console.log(`${winner.name} is the winner!!!`);
  }
}
