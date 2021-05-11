import Button from "./Button.js";

class ColorButton extends Button {
  constructor(text, tintColor) {
    super(0, 0, 100, 40, text);
    this.tintColor = tintColor;
  }
}