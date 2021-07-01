import Button from "./Button.js";
import Strings from "../data/strings.js";
import { COLORS } from "../constants.js";

export default class TutorialButton extends Button {
  constructor(x, y, width, height) {
    super(x, y, width, height);
    this.mode = "show";
  }

  get title() {
    return this.mode == "close"
      ? Strings.tutorialButton.hide
      : Strings.tutorialButton.show;
  }

  toggleMode() {
    this.mode = this.mode === "show" ? "close" : "show";
  }

  displaySprite() {
    translate(this.x, this.y);
    fill(COLORS.darkBlack);
    strokeWeight(2);
    stroke(COLORS.black);
    circle(this.width / 2, this.height / 2, this.width);

    fill(COLORS.white);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(25);
    text(this.title, this.width / 2, this.height / 2);
  }
}
