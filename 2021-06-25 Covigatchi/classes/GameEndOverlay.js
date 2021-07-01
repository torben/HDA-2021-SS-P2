import Sprite from "./Sprite.js";
import MenuButton from "./MenuButton.js";
import Settings from "../settings.js";
import Strings from "../data/strings.js";
import { COLORS } from "../constants.js";
import { decimalFormat } from "../helpers.js";

export default class GameEndOverlay extends Sprite {
  constructor() {
    super(0, 0);
    this.width = Settings.canvasSize;
    this.height = Settings.canvasSize;
    this.overlayWidth = 500;
    this.overlayHeight = 300;
    this.result = {};

    this.menuButton = new MenuButton("menu", Strings.gameResult.buttons.menu);
    this.buttons = [this.menuButton];
  }

  displaySprite() {
    const gameManager = this.result.gameManager;
    const playerStatus = this.result.playerStatus;
    const daysCount = gameManager.gameDuration * playerStatus.rest.tickDropValue;
    const resultKey = gameManager.isPlayerDead ? "failed" : "success";
    const padding = 20;
    const points = playerStatus.science.percent < 1 ? 0 : gameManager.pointsAmount;

    super.displaySprite();

    let backgroundColor = color(COLORS.darkBlack);
    backgroundColor.setAlpha(200);
    fill(backgroundColor);

    let position = {
      x: (Settings.canvasSize / 2) - (this.overlayWidth / 2),
      y: (Settings.canvasSize / 2) - (this.overlayHeight / 2)
    }
    rect(position.x, position.y, this.overlayWidth, this.overlayHeight);

    position.x += padding
    position.y += padding * 2

    fill(COLORS.white);
    textSize(22);
    text(Strings.gameResult[resultKey].title, position.x, position.y);
    position.y += 20;

    textSize(16);
    text(Strings.gameResult[resultKey].result, position.x, position.y, this.overlayWidth - (padding * 2), 100);
    position.y += 90;

    text(Strings.gameResult.daysCount, position.x, position.y);
    text(decimalFormat(daysCount), position.x + 170, position.y);
    position.y += 22;

    text(Strings.gameResult.scienceProgress, position.x, position.y);
    text(`${Math.round(playerStatus.science.percent * 100)}%`, position.x + 170, position.y);
    position.y += 22;

    text(Strings.gameResult.pointsAmount, position.x, position.y);
    text(decimalFormat(points), position.x + 170, position.y);
    position.y += 25;

    this.menuButton.x = position.x;
    this.menuButton.y = position.y;
    this.menuButton.display();
  }
}
