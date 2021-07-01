import SubMenu from "./SubMenu.js";
import HighscoreEntry from "./HighscoreEntry.js";
import MenuButton from "./MenuButton.js";
import Strings from "../data/strings.js";
import { COLORS } from "../constants.js";
import { loadScores } from "../helpers.js";

export default class Highscore extends SubMenu {
  constructor(images) {
    super(images);
    this.backButton = new MenuButton("menu", Strings.highscore.buttons.done)
    this.buttons = [this.backButton];
    this.generateScoreEntries();
  }

  async generateScoreEntries() {
    const scores = await loadScores();
    this.highscoreEntries = scores
      .sort((scoreA, scoreB) => {
        if (scoreA.points > scoreB.points) {
          return -1;
        } else if (scoreA.points < scoreB.points) {
          return 1;
        } else {
          return 0;
        }
      }).filter(score => {
        return score && score.character && score.name && score.time && score.points !== null
      }).map((score, i) => {
        const characterImage = this.images[score.character.toLowerCase()];
        return new HighscoreEntry(i + 1, score, characterImage)
      });
  }

  displaySprite() {
    const imagePosition = super.displaySprite();
    const buttonWidth = this.buttons[0].width;
    const padding = this.padding;
    const textPadding = 10;
    const bottom = imagePosition.y + this.images.logo.height + padding;
    const buttonBottom = this.height - this.backButton.height - padding;
    const boxRect = {
      x: padding,
      y: bottom,
      width: this.width - (padding * 2),
      height: this.height - bottom - (this.height - buttonBottom) - padding
    };

    fill(COLORS.black);
    rect(boxRect.x, boxRect.y, boxRect.width, boxRect.height);
    

    fill(COLORS.white);
    textSize(22);
    if (this.highscoreEntries.length) {
      text(Strings.highscore.title, boxRect.x + textPadding, boxRect.y + textPadding + 20);
    } else {
      textAlign(CENTER, CENTER);
      textStyle(ITALIC);
      text(Strings.highscore.noRecords, this.width / 2, boxRect.y + (boxRect.height / 2));
    }

    const startY = boxRect.y + textPadding + 50;
    const rowCount = 2;
    let row = 1;
    let position = {
      x: boxRect.x + textPadding,
      y: startY
    };

    this.highscoreEntries.forEach(highscoreEntry => {
      if (row > rowCount) {
        return;
      }
      const nextY = highscoreEntry.height + textPadding;

      highscoreEntry.x = position.x;
      highscoreEntry.y = position.y;
      highscoreEntry.display();

      if (nextY + position.y > boxRect.x + boxRect.height - textPadding) {
        position.y = startY;
        position.x += (boxRect.width / 2) + textPadding;
        row += 1;
      } else {
        position.y += nextY;
      }
    });

    this.backButton.x = (this.width / 2) - (this.backButton.width / 2);
    this.backButton.y = buttonBottom;
    this.backButton.display();
  }
}
