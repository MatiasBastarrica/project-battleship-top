import { describe, expect, test } from "@jest/globals";
import { Gameboard } from "../gameboard.js";

test("Receive one attack", () => {
  let gameboard1 = new Gameboard();
  gameboard1.placeShip([0, 1], gameboard1.ships.carrier, "x");
  gameboard1.receiveAttack([0, 1], "Leon S Kennedy");
  expect(gameboard1.board[0][1].ship.hitCount).toBe(1);
});

test("Check if there are shinks remaining", () => {
  let gameboard1 = new Gameboard();
  gameboard1.placeShip([0, 0], gameboard1.ships.carrier, "x");
  gameboard1.placeShip([1, 0], gameboard1.ships.patrolBoat, "x");
  gameboard1.receiveAttack([0, 0], "Leon S Kennedy");
  gameboard1.receiveAttack([0, 1], "Leon S Kennedy");
  gameboard1.receiveAttack([1, 0], "Leon S Kennedy");
  gameboard1.receiveAttack([1, 1], "Leon S Kennedy");
  expect(gameboard1.getAllSunkReport()).toBe(false);
});

test("Check if all the ships have been sunk", () => {
  let gameboard1 = new Gameboard();
  function sink(ship, board, coordinate, axis) {
    let row = coordinate[0];
    let col = coordinate[1];
    for (let i = 0; i < ship.length; i++) {
      if (axis === "x") {
        board.receiveAttack([row, col + i], "Leon S Kennedy");
      } else {
        board.receiveAttack([row + i, col], "Leon S Kennedy");
      }
    }
  }
  gameboard1.placeShip([0, 0], gameboard1.ships.carrier, "x");
  sink(gameboard1.ships.carrier, gameboard1, [0, 0], "x");
  gameboard1.placeShip([1, 0], gameboard1.ships.battleship, "x");
  sink(gameboard1.ships.battleship, gameboard1, [1, 0], "x");
  gameboard1.placeShip([2, 0], gameboard1.ships.destroyer, "x");
  sink(gameboard1.ships.destroyer, gameboard1, [2, 0], "x");
  gameboard1.placeShip([3, 0], gameboard1.ships.submarine, "x");
  sink(gameboard1.ships.submarine, gameboard1, [3, 0], "x");
  gameboard1.placeShip([4, 0], gameboard1.ships.patrolBoat, "x");
  sink(gameboard1.ships.patrolBoat, gameboard1, [4, 0], "x");
  expect(gameboard1.getAllSunkReport()).toBe(true);
});

test("Attack the same coordinate", () => {
  const gameboard1 = new Gameboard();
  gameboard1.placeShip([0, 0], gameboard1.ships.carrier, "x");
  gameboard1.receiveAttack([0, 0]);
  gameboard1.receiveAttack([0, 0]);
  expect(gameboard1.board[0][2].ship.hitCount).toBe(1);
});

test("Compare the ship on the report and the ship on the board", () => {
  const gameboard1 = new Gameboard();
  gameboard1.placeShip([0, 0], gameboard1.ships.carrier, "x");
  let report = gameboard1.receiveAttack([0, 0]);

  expect(report.ship).toBe(gameboard1.ships.carrier);
});

test("A missed attack is registerd as already attaked", () => {
  const gameboard1 = new Gameboard();
  gameboard1.placeShip([0, 0], gameboard1.ships.carrier, "x");
  gameboard1.receiveAttack([1, 1]);
  console.log(gameboard1.board[1][1]);
  expect(gameboard1.board[1][1].alreadyAttacked).toBe(true);
});
