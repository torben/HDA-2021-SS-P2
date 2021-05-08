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
    textSize(16);
    fill("white");
    text(`${this.text} -> ${this.state}`, 0, 0);
    pop();
  }

  hitTest() {
    if (
      mouseX >= this.x &&
      mouseX <= this.x + this.width &&
      mouseY >= this.y - (this.height / 2) &&
      mouseY <= this.y - (this.height / 2) + this.height
    ) {
      this.state = "clicked";
      return true;
    } else {
      return false;
    }
  }
}