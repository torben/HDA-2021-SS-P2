import Sprite from "./Sprite.js";
import MenuButton from "./MenuButton.js";
import Settings from "../settings.js";
import Strings from "../data/strings.js";
import { COLORS } from "../constants.js";

export default class Menu extends Sprite {
  constructor(images) {
    super(0, 0);
    this.width = Settings.canvasSize;
    this.height = Settings.canvasSize;
    this.images = images;
    this.hasSavedGame = false;
    this.alpha = 1;

    this.buttons = [
      new MenuButton("continueGame", Strings.menu.buttons.continueGame),
      new MenuButton("startGame", Strings.menu.buttons.startGame),
      new MenuButton("highscore", Strings.menu.buttons.highscore)
    ];
  }

  animateIn() {
    this.alpha = 0;
    const duration = 0.8;
    let delay = 0;

    this.buttons.forEach(button => {
      button.offsetY = 45;

      gsap.to(button, {
        duration,
        delay,
        offsetY: 0
      });

      delay += 0.05;
    });

    gsap.to(this, {
      duration: duration + delay,
      alpha: 1
    });
  }

  animateOut(onComplete) {
    const duration = 0.3

    gsap.to(this, {
      duration,
      alpha: 0,
      onComplete
    });
  }

  displaySprite() {
    super.displaySprite();

    translate(this.x, this.y);
    fill(COLORS.darkBlack);
    noStroke();
    rect(0, 0, this.width, this.height);
    image(this.images.logo, (this.width / 2) - (this.images.logo.width / 2), this.height * 0.2);

    let position = {
      x: (this.width / 2) - (this.buttons[0].width / 2),
      y: this.height * 0.55
    }

    this.buttons.forEach(button => {
      if (button.type === "continueGame" && !this.hasSavedGame) {
        return
      }

      button.x = position.x;
      button.y = position.y;
      button.alpha = this.alpha;
      button.display();

      position.y += button.height + 20;
    });

    fill(COLORS.white);
    text(Strings.menu.footer.referenceInfo, 10, this.height - 15);

    textAlign(RIGHT);
    text(Strings.menu.footer.author, this.width - 10, this.height - 15);

    const inverseAlpha = (1 - this.alpha);
    if (inverseAlpha > 0) {
      fill(0, 0, 0, 255 * inverseAlpha);
      rect(0, 0, this.width, this.height);
    }
  }
}
