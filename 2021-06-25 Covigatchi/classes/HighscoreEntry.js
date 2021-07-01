import Sprite from "./Sprite.js";
import { COLORS } from "../constants.js";
import Strings from "../data/strings.js";

export default class HighscoreEntry extends Sprite {
  constructor(position, score, image) {
    super(0, 0);
    this.position = position;
    this.score = score;
    this.height = 60;
    this.image = image;
  }

  displaySprite() {
    const date = new Date(this.score.time);
    const formatedDate = Intl.DateTimeFormat("de", { dateStyle: "short", timeStyle: "short" }).format(date)
    const attributeTextHeight = this.height / 3;
    const padding = 10;

    translate(this.x, this.y);

    let position = {
      x: 0,
      y: 0
    }

    fill(COLORS.white);
    textSize(40);
    textAlign(LEFT, CENTER);
    text(`${this.position}.`, 0, (this.height / 2));
    position.x += 50;

    image(this.image, position.x, position.y);
    position.x += this.image.width + padding;

    textStyle(BOLD);
    textSize(20);
    text(this.score.points || 0, position.x, position.y + (attributeTextHeight / 2));
    position.y += attributeTextHeight;

    textStyle(NORMAL);
    textSize(16);
    text(this.score.name, position.x, position.y + (attributeTextHeight / 2));
    position.y += attributeTextHeight;

    text(`${formatedDate} ${Strings.highscore.time}`, position.x, position.y + (attributeTextHeight / 2));
  }
}
