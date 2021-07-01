import Sprite from "./Sprite.js";
import ProgressBar from "./ProgressBar.js";
import Strings from "../data/strings.js";

export default class Need extends Sprite {
  constructor({ type, relation, height, hasFullSize }) {
    super(0, 0);

    this.type = type;
    this.relation = relation;
    this.width = 0;
    this.height = height;
    this.hasFullSize = hasFullSize;
  }

  get progressBar() {
    if (this._progressBar) {
      return this._progressBar;
    }
    this._progressBar = new ProgressBar();
    return this._progressBar;
  }

  set x(newValue) {
    this.progressBar.x = newValue;
    this._x = newValue;
  }

  get x() {
    return this._x;
  }

  set y(newValue) {
    this.progressBar.y = newValue + 20;
    this._y = newValue;
  }

  get y() {
    return this._y;
  }

  set width(newValue) {
    this.progressBar.width = newValue;
    this._width = newValue;
  }

  get width() {
    return this._width;
  }

  set height(newValue) {
    this.progressBar.height = newValue - 20;
    this._height = newValue;
  }

  get height() {
    return this._height;
  }

  displaySprite() {
    fill("white");
    textSize(14);
    text(`${Strings.needs[this.type]}:`, this.x, this.y + 14);

    this.progressBar.display();
  }
}
