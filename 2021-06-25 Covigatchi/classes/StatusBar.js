import Sprite from "./Sprite.js";
import Need from "./Need.js";
import { COLORS } from "../constants.js";

export default class StatusBar extends Sprite {
  constructor(width, playerStatus) {
    super(0, 0);
    this.width = width;
    this.padding = 15;
    this.colCount = 2;
    this.needsHeight = 35;
    this.playerStatus = playerStatus;

    this.needs = {
      food: new Need({ height: this.needsHeight, type: "food", relation: "kitchen" }),
      relax: new Need({ height: this.needsHeight, type: "relax", relation: "tv" }),
      rest: new Need({ height: this.needsHeight, type: "rest", relation: "bed" }),
      pipikaka: new Need({ height: this.needsHeight, type: "pipikaka", relation: "toilet" }),
      science: new Need({ height: this.needsHeight, type: "science", relation: "science", hasFullSize: true })
    };
  }

  updatePlayerStatus(playerStatus) {
    this.playerStatus = playerStatus;

    Object.keys(playerStatus).forEach(key => {
      const need = this.needs[key];
      if (!need) {
        return;
      }
      need.progressBar.percent = playerStatus[key].percent;
    });
  }

  displaySprite() {
    let y = this.padding;
    let x = this.padding;
    const width = (this.width - (this.padding * (this.colCount + 1))) / this.colCount;
    const rowCount = Math.ceil(Object.keys(this.needs).length / this.colCount);
    const height = (rowCount * this.needsHeight) + ((rowCount + 1) * this.padding);

    translate(this.x, this.y);

    fill(COLORS.darkBlack);
    noStroke();
    rect(0, 0, this.width, height);

    const keys = Object.keys(this.needs);
    for (let i=0; i<keys.length; i++) {
      const need = this.needs[keys[i]];

      need.x = x;
      need.y = y;
      need.width = need.hasFullSize ? this.width - (this.padding * 2) : width;
      need.display();

      // BUG: hasFullSize should be removed because this can cause an issue here
      if ((i + 1) % this.colCount === 0) {
        y += need.height + this.padding;
        x = this.padding;
      } else {
        x += width + this.padding;
      }
    }
  }
}
