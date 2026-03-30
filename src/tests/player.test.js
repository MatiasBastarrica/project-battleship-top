import { describe, expect, test } from "@jest/globals";
import { RealPlayer, Computer } from "../player.js";

test("Real player plays one turn", () => {
  let real = new RealPlayer("Leon S Kennedy");
  let computer = new Computer();
  computer.gameboard.placeShip([0, 0], computer.gameboard.ships.carrier, "x");
  real.playTurn([0, 0], computer);
  expect(computer.gameboard.board[0][0].ship.hitCount).toBe(1);
});
