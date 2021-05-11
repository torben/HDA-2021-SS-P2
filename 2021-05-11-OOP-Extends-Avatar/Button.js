export default class Button {
  constructor(x, y, width, height, text) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = text;
  }

  display() {
    push();
    translate(this.x, this.y);
    this.displayButton();
    pop();
  }

  displayButton() {
    textSize(16);
    fill("white");
    text(this.text, 0, this.height / 2);
  }

  hitTest() {
    if (
      mouseX >= this.x &&
      mouseX <= this.x + this.width &&
      mouseY >= this.y &&
      mouseY <= this.y + this.height
    ) {
      this.state = "clicked";
      return true;
    } else {
      return false;
    }
  }
}