import Sprite from "./Sprite.js";
import WaypointBuilder from "./WaypointBuilder.js";
import Settings from "../settings.js";

export default class MoveableImageSprite extends Sprite {
  constructor(image) {
    super(0, 0);
    this.image = image;
    this.moveSpeed = 3;
    this.destinations = [];
    this.debugPathes = [];
  }

  get center() {
    const scaleValue = Settings.scaleValue;
    return {
      x: (this.x * scaleValue) + (this.image.width * scaleValue / 2),
      y: (this.y * scaleValue) + (this.image.height * scaleValue / 2)
    };
  }

  get waypointBuilder() {
    if (!this._waypointBuilder) {
      this._waypointBuilder = new WaypointBuilder(this);
    }
    return this._waypointBuilder;
  }

  set destination(newValue) {
    if (!newValue) {
      this.destinations = null;
      return;
    }

    this.destinations = this.waypointBuilder.createWaypoints(newValue);
  }

  get destination() {
    if (this.destinations && this.destinations.length) {
      return this.destinations[0];
    }
    return null;
  }

  completeDestination() {
    if (!this.destinations || !this.destinations.length) {
      return;
    }
    this.destinations.shift();
  }

  goToDestination(destination) {
    this.destination = {
      x: Math.round(destination.x - (this.image.width / 2)),
      y: Math.round(destination.y - (this.image.height / 1.7)),
    };
  }

  goToToRandomPosition() {
    const size = this.image.width;
    const position = {
      x: Math.floor(random(0, Settings.canvasSize * Settings.scaleValue)),
      y: Math.floor(random(0, Settings.canvasSize * Settings.scaleValue))
    };
    this.goToDestination(position);
  }

  shouldMoveSprite() {
    if (!this.destination) {
      return false;
    }
    return this.destination.x !== this.x || this.destination.y !== this.y;
  }

  moveSprite() {
    const stillMoving = { x: false, y: false };
    if (this.destination.x > this.x) {
      this.x += this.moveSpeed;
      stillMoving.x = this.destination.x > this.x;
    } else if (this.destination.x < this.x) {
      this.x -= this.moveSpeed;
      stillMoving.x = this.destination.x < this.x;
    }

    if (this.destination.y > this.y) {
      this.y += this.moveSpeed;
      stillMoving.y = this.destination.y > this.y;
    } else if (this.destination.y < this.y) {
      this.y -= this.moveSpeed;
      stillMoving.y = this.destination.y < this.y;
    }
    if (!stillMoving.x && !stillMoving.y) {
      this.completeDestination();
    } else if (!stillMoving.x) {
      this.x = this.destination.x;
    } else if (!stillMoving.y) {
      this.y = this.destination.y;
    }
    return stillMoving;
  }

  preDisplay() {
    if (this.shouldMoveSprite()) {
      this.moveSprite();
    }
  }

  displaySprite() {
    super.displaySprite();

    if (!this.image) {
      return;
    }
    image(this.image, this.x, this.y);
  }
}
