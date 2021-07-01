import Settings from "../settings.js";

export default class Map {
  constructor({ backgroundImage }) {
    this.images = {
      background: backgroundImage
    };
  }

  display() {
    push();
    image(this.images.background, 0, 0);

    if (Settings.shouldShowGrid && this.images.background) {
      this.addGrid();
    }
    pop();
  }

  addGrid() {
    const size = this.images.background.width;
    const step = Settings.gridSize;
    const amount = size / step;
    
    let position = 0;
    for (let i=0; i<amount; i++) {
      line(0, position, size, position);
      line(position, 0, position, size);
      position += step;
    }
  }
}
