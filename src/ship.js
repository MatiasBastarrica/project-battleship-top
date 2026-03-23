export class Ship {
  constructor(length, type) {
    this.length = length;
    this.hitCount = 0;
    this.sunk = false;
    this.type = type;
  }

  hit() {
    this.hitCount++;
    if (this.isSunk()) {
      this.sunk = true;
    }
  }

  isSunk() {
    if (this.hitCount === this.length) {
      return true;
    } else {
      return false;
    }
  }
}
