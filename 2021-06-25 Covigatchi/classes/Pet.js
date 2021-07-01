import MoveableImageSprite from "./MoveableImageSprite.js";

export default class Pet extends MoveableImageSprite {
  constructor(images) {
    super(images.right);
    this.images = images;
    this.moveSpeed = 1;
    this.waitCount = 0;
  }

  move() {
    if (this.shouldMoveSprite()) {
      return;
    }

    if (this.waitCount <= 0 && Math.round(random(0, 1)) === 0) {
      this.waitCount = Math.round(random(20, 100));
    }

    this.waitCount -= 1;
    if (this.waitCount <= 0) {
      this.goToToRandomPosition();
    }
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
    }
  }
}
