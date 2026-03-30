import { describe, expect, test } from "@jest/globals";
import { Game } from "../game.js";
import { getRandomNumInRange } from "../utils.js";

test.skip("Play a game", () => {
  const game1 = new Game("Leon S Kennedy");
  game1.player1.gameboard.placeAllRandom();
  game1.computer.gameboard.placeAllRandom();

  let player1Attacks = [];
  let computerAttacks = [];

  while (!game1.over) {
    let coor = [getRandomNumInRange(0, 9), getRandomNumInRange(0, 9)];
    if (game1.turn === game1.player1) {
      while (player1Attacks.includes(String(coor))) {
        coor = [getRandomNumInRange(0, 9), getRandomNumInRange(0, 9)];
      }
      player1Attacks.push(String(coor));
    }
    game1.play(coor);
  }

  expect(game1.over).toBe(true);
});

test("Play a game in which computer wins", () => {
  const game1 = new Game("Leon S Kennedy");
  game1.player1.gameboard.placeAllRandom();
  game1.computer.gameboard.placeAllRandom();

  let player1Attacks = [];
  let computerAttacks = [];

  while (!game1.over) {
    let coor = [getRandomNumInRange(0, 9), getRandomNumInRange(0, 9)];
    if (game1.turn === game1.player1) {
      while (player1Attacks.includes(String(coor))) {
        coor = [getRandomNumInRange(0, 9), getRandomNumInRange(0, 9)];
      }
      player1Attacks.push(String(coor));
    }
    game1.play(coor);
  }

  expect(game1.winner).toBe("Computer");
});
