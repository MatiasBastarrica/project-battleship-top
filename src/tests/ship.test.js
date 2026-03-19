import { describe, expect, test } from "@jest/globals";
import { Ship } from "../ship.js";

test.skip("Take hits", () => {
  const hits = [1, 2, 3, 4];

  hits.forEach((hit) => {
    let ship = new Ship(3);
    for (let i = 0; i < hit; i++) {
      ship.hit();
    }
    expect(ship.hitCount).toBe(hit);
  });
});

test.skip("Find out if the ship is sunk", () => {
  let ship = new Ship(1);
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});

test.skip("Find out if the ship is sunk", () => {
  let ship = new Ship(1);
  expect(ship.isSunk()).toBe(false);
});

test("Update the 'sunk' property", () => {
  let ship = new Ship();
  ship.hit();
  expect(ship.sunk).toBe(true);
});

test("Don't update the 'sunk' property", () => {
  let ship = new Ship();
  expect(ship.sunk).toBe(false);
});
