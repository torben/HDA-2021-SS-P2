import Button from "./Button.js";

class MenuButton extends Button {
  constructor(x, y, text) {
    super(x, y, 150, 40, text);
    this.cornerRadius = 20;
  }

  displayButton() {
    fill(this.fillColor());
    rect(0, 0, this.width, this.height, this.cornerRadius);

    textSize(16);
    fill("black");
    textAlign(CENTER, CENTER);
    text(this.text, this.width / 2, this.height / 2);
  }

  fillColor() {
    if (this.hitTest() && mouseIsPressed) {
      return "gray";
    } else {
      return "white";
    }
  }
}