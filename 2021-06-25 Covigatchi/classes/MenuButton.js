import Button from "./Button.js";
import { COLORS } from "../constants.js";

export default class MenuButton extends Button {
  constructor(type, title, value=null) {
    super(0, 0, 170, 50);
    this.type = type;
    this.title = title;
    this.value = value;

    this.offsetX = 0;
    this.offsetY = 0;
  }

  get x() {
    return this._x + this.offsetX
  }

  set x(x) {
    this._x = x;
  }

  get y() {
    return this._y + this.offsetY;
  }

  set y(y) {
    this._y = y;
  }

  get isPressed() {
    return mouseIsPressed && this.hitTest(mouseX, mouseY);
  }

  get isHover() {
    return !mouseIsPressed && this.hitTest(mouseX, mouseY);
  }

  get backgroundColor() {
    if (this.isPressed) {
      return COLORS.darkBrown
    } else if (this.isHover) {
      return COLORS.lightBrown;
    }
    return COLORS.brown;
  }

  displaySprite() {
    const isPressed = this.isPressed;
    const strokeColor = isPressed
      ? COLORS.darkestBrown
      : COLORS.darkBrown;
    const textColor = isPressed
      ? COLORS.gray
      : COLORS.white;

    translate(this.x, this.y);
    fill(this.backgroundColor);
    strokeWeight(2);
    stroke(strokeColor);
    rect(0, 0, this.width, this.height, 5);

    fill(textColor);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(18);
    text(this.title, this.width / 2, this.height / 2);
  }
}
