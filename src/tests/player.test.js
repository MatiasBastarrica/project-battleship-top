import { describe, expect, test } from "@jest/globals";
import { RealPlayer, Computer } from "../player.js";

test("Real player plays one turn hitting a ship", () => {
  let real = new RealPlayer("Leon S Kennedy");
  let computer = new Computer();
  computer.gameboard.placeShip([0, 0], computer.gameboard.ships.carrier, "x");
  real.playTurn(computer, [0, 0]);
  expect(computer.gameboard.board[0][0].ship.hitCount).toBe(1);
});

test("Real player plays one turn hitting  water", () => {
  let real = new RealPlayer("Leon S Kennedy");
  let computer = new Computer();
  computer.gameboard.placeShip([0, 0], computer.gameboard.ships.carrier, "x");
  real.playTurn(computer, [1, 0]);
  expect(
    !computer.gameboard.board[1][0].ship &&
      !computer.gameboard.board[1][0].alreadyAttacked,
  ).toBe(true);
});

test("Computer plays one turn hitting a ship", () => {
  let real = new RealPlayer("Leon S Kennedy");
  let computer = new Computer();
  real.gameboard.placeShip([0, 0], computer.gameboard.ships.carrier, "x");
  computer.playTurn(real, [0, 0]);
  expect(real.gameboard.board[0][0].ship.hitCount).toBe(1);
});

test("Computer plays one turn hitting water", () => {
  let real = new RealPlayer("Leon S Kennedy");
  let computer = new Computer();
  real.gameboard.placeShip([0, 0], computer.gameboard.ships.carrier, "x");
  computer.playTurn(real, [1, 0]);
  expect(
    !real.gameboard.board[1][0].ship &&
      !real.gameboard.board[1][0].alreadyAttacked,
  ).toBe(true);
});
