import { RealPlayer, Computer } from "./player.js";

class Game {
  constructor(playerName) {
    this.player1 = new RealPlayer(playerName);
    this.computer = new Computer();
  }

  #turn = this.player1;

  playTurn(coordinate) {
    let opponent = this.#turn === this.player1 ? this.computer : this.player1;

    opponent.gameboard.receiveAttack(coordinate);
    if (opponent.gameboard.getAllSunkReport()) {
      this.gameOver(this.#turn);
      return;
    }
    this.#turn = opponent;
  }

  gameOver(winner) {
    console.log(`${winner.name} is the winner!!!`);
  }
}
