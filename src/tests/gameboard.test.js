import { describe, expect, test } from "@jest/globals";
import { Gameboard } from "../gameboard.js";

test("Receive one attack", () => {
  let gameboard1 = new Gameboard();
  gameboard1.placeShip([0, 1], gameboard1.ships.carrier, "horizontal");
  gameboard1.receiveAttack([0, 1]);
  expect(gameboard1.board[0][1].ship.hitCount).toBe(1);
});

test("Check if there are shinks remaining", () => {
  let gameboard1 = new Gameboard();
  gameboard1.placeShip([0, 0], gameboard1.ships.carrier, "horizontal");
  gameboard1.placeShip([1, 0], gameboard1.ships.patrolBoat, "horizontal");
  gameboard1.receiveAttack([0, 0]);
  gameboard1.receiveAttack([0, 1]);
  gameboard1.receiveAttack([1, 0]);
  gameboard1.receiveAttack([1, 1]);
  expect(gameboard1.getAllSunkReport()).toBe(false);
});

test("Check if all the ships have been sunk", () => {
  let gameboard1 = new Gameboard();
  function sink(ship, board, coordinate) {
    for (let i = 0; i < ship.length; i++) {
      board.receiveAttack(coordinate);
    }
  }
  gameboard1.placeShip([0, 0], gameboard1.ships.carrier, "horizontal");
  sink(gameboard1.ships.carrier, gameboard1, [0, 0]);
  gameboard1.placeShip([1, 0], gameboard1.ships.battleship, "horizontal");
  sink(gameboard1.ships.battleship, gameboard1, [1, 0]);
  gameboard1.placeShip([2, 0], gameboard1.ships.destroyer, "horizontal");
  sink(gameboard1.ships.destroyer, gameboard1, [2, 0]);
  gameboard1.placeShip([3, 0], gameboard1.ships.submarine, "horizontal");
  sink(gameboard1.ships.submarine, gameboard1, [3, 0]);
  gameboard1.placeShip([4, 0], gameboard1.ships.patrolBoat, "horizontal");
  sink(gameboard1.ships.patrolBoat, gameboard1, [4, 0]);
  expect(gameboard1.getAllSunkReport()).toBe(true);
});
