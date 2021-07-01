import Sprite from "./Sprite.js";
import Settings from "../settings.js"

export default class Button extends Sprite {
  constructor(x, y, width, height) {
    super(x, y);
    this.width = width;
    this.height = height;
  }

  hitTest(x, y) {
    const currentX = this.x * Settings.scaleValue;
    const currentY = this.y * Settings.scaleValue;
    const height = this.height * Settings.scaleValue;
    const width = this.width * Settings.scaleValue;
    return x > currentX && x < currentX + width && y > currentY && y < currentY + height;
  }
}
