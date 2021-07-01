import MoveableImageSprite from "./MoveableImageSprite.js";
import { positionForCoordinates, actionMapObjectForPosition } from "../helpers.js";

export default class Player extends MoveableImageSprite {
  constructor(images) {
    super(images.bottom);
    this.images = images;
    this.state = "alive";
  }

  get isDead() {
    return this.state === "dead";
  }

  performingAction() {
    if (this.shouldMoveSprite()) {
      return null;
    }
    const position = positionForCoordinates({ x: this.x + (this.image.width / 2), y: this.y + (this.image.height / 2) });
    return actionMapObjectForPosition(position);
  }

  moveSprite() {
    const pos = {
      x: this.x,
      y: this.y
    }
    const stillMoving = super.moveSprite();
    if (!this.shouldMoveSprite()) {
      return;
    }
    if (stillMoving.x) {
      const imageName = this.x > pos.x ? "right" : "left";
      this.image = this.images[imageName];
    } else if (stillMoving.y) {
      const imageName = this.y > pos.y ? "bottom" : "top";
      this.image = this.images[imageName];
    }
  }

  completeDestination() {
    super.completeDestination();
    if (!this.shouldMoveSprite() && !this.performingAction()) {
      this.image = this.images.bottom;
    }
  }

  die() {
    this.image = this.images.dead;
    this.destination = null;
    this.state = "dead";
  }

  shouldMoveSprite() {
    if (this.isDead) {
      return false;
    }

    return super.shouldMoveSprite();
  }
}
