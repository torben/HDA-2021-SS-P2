export default class Avatar {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.state = "normal";
  }

  display() {
    push();
    translate(this.x, this.y);

    this.displayBody();
    this.diplayEyes();
    this.drawMouth();

    pop();
  }

  displayBody() {
    if (this.state === "normal") {
      fill("orange");
    } else if (this.state === "happy") {
      fill("green");
    } else if (this.state === "sad") {
      fill("red");
    }
    
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