export default class Avatar {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.tintColor = "orange";
  }

  display() {
    push();
    let halfSize = this.size / 2;
    translate(this.x + halfSize, this.y + halfSize);

    this.displayBody();
    this.diplayEyes();
    this.drawMouth();

    pop();
  }

  displayBody() {
    fill(this.tintColor);
    ellipse(0, 0, this.size);
  }

  diplayEyes() {
    let eyeSize = 4;
    let x = this.size / 7;
    let y = this.size / -7;
    ellipse(-x, y, eyeSize);
    ellipse(x, y, eyeSize);
  }

  drawMouth() {
    let x = this.size / 7;
    line(-x, 20, x, 20);
  }
}