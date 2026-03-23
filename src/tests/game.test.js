import { describe, expect, test } from "@jest/globals";
import { Game } from "../game.js";

test("Play a game", () => {
  const game1 = new Game("Leon");
  game1.player1.gameboard.placeAllRandom();
  game1.computer.gameboard.placeAllRandom();

  let player1Attacks = [];
  let computerAttacks = [];

  while (!game1.over) {
    let row = getRandomNumInRange(0, 9);
    let col = getRandomNumInRange(0, 9);

    if (game1.turn === game1.player1) {
      while (player1Attacks.includes(String([row, col]))) {
        row = getRandomNumInRange(0, 9);
        col = getRandomNumInRange(0, 9);
      }
      player1Attacks.push(String([row, col]));
    } else if (game1.turn === game1.computer) {
      while (computerAttacks.includes(String([row, col]))) {
        row = getRandomNumInRange(0, 9);
        col = getRandomNumInRange(0, 9);
      }
      computerAttacks.push(String([row, col]));
    }

    game1.playTurn([row, col]);
  }

  expect(game1.over).toBe(true);

  function getRandomNumInRange(min, max) {
    let random = Math.floor(Math.random() * (max - min + 1)) + min;
    return random;
  }
});
