import Sprite from "./Sprite.js";
import { COLORS } from "../constants.js";

export default class ProgressBar extends Sprite {
  constructor() {
    super(0, 0);

    this.percent = 1;
  }

  displaySprite() {
    if (this.percent < 0) {
      this.percent = 0;
    }
    if (this.percent > 1) {
      this.percent = 1;
    }

    fill(COLORS.black);
    rect(this.x, this.y, this.width, this.height);

    fill(this.fillColor());
    rect(this.x, this.y, this.width * this.percent, this.height);
  }

  fillColor() {
    if (this.percent >= 0.4) {
      return COLORS.turquoise;
    } else if (this.percent >= 0.2) {
      return COLORS.yellow;
    }
    return COLORS.red;
  }
}
