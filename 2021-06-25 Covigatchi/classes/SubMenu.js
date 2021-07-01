import Sprite from "./Sprite.js";
import Settings from "../settings.js";
import { COLORS } from "../constants.js";

export default class SubMenu extends Sprite {
  constructor(images) {
    super(0, 0);
    this.width = Settings.canvasSize;
    this.height = Settings.canvasSize;
    this.images = images;
    this.buttons = [];
    this.padding = 50;
  }

  displaySprite() {
    super.displaySprite();

    translate(this.x, this.y);
    fill(COLORS.darkBlack);
    noStroke();
    rect(0, 0, this.width, this.height);
    
    const imagePosition = {
      x: (this.width / 2) - (this.images.logo.width / 2),
      y: this.padding
    }

    image(this.images.logo, imagePosition.x, imagePosition.y);
    return imagePosition;
  }
}
