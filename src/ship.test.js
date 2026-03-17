import { describe, expect, test } from "@jest/globals";
import { Ship } from "./ship.js";

test("Take hits", () => {
  const hits = [1, 2, 3, 4];

  hits.forEach((hit) => {
    let ship = new Ship(3);
    for (let i = 0; i < hit; i++) {
      ship.hit();
    }
    expect(ship.hitCount).toBe(hit);
  });
});
