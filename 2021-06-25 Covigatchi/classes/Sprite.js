import Settings from "../settings.js";

export default class Sprite {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  preDisplay() {
  }

  displaySprite() {
  }

  display() {
    this.preDisplay();
    push();
    this.displaySprite();
    pop();
  }
}
