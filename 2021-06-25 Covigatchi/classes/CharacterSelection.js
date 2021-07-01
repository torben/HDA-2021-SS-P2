import SubMenu from "./SubMenu.js";
import MenuButton from "./MenuButton.js";
import Strings from "../data/strings.js";
import { COLORS } from "../constants.js";

export default class CharacterSelection extends SubMenu {
  constructor(images) {
    super(images);
    this.buttons = [
      new MenuButton("character", Strings.characterSelection.buttons.connic, "Connic"),
      new MenuButton("character", Strings.characterSelection.buttons.covick, "Covick")
    ];
  }

  displaySprite() {
    const imagePosition = super.displaySprite();
    const buttonWidth = this.buttons[0].width;
    const padding = this.padding;
    const buttonsSize = (buttonWidth * this.buttons.length + (padding * (this.buttons.length - 1)));
    const textBlockHeight = 150;
    const textPadding = 15;

    let position = {
      x: (this.width - buttonsSize) / 2,
      y: imagePosition.y + this.images.logo.height + padding
    }

    fill(COLORS.black);
    rect(position.x, position.y, buttonsSize, textBlockHeight);
    fill(COLORS.white);
    textSize(15);
    text(Strings.characterSelection.introduction, position.x + textPadding, position.y + textPadding, buttonsSize - (textPadding * 2), textBlockHeight - (textPadding * 2));

    position.y += textBlockHeight + padding;

    textSize(22);
    textAlign(CENTER);
    text(Strings.characterSelection.chooseCharacter, this.width / 2, position.y);
    position.y += padding;

    this.displayButtons(position);
  }

  displayButtons(position) {
    this.buttons.forEach(button => {
      const characterImage = this.images[button.value.toLowerCase()];
      image(characterImage, position.x + (button.width / 2) - (characterImage.width / 2), position.y);

      button.x = position.x;
      button.y = position.y + characterImage.height + this.padding;
      button.display();

      position.x += button.width + this.padding;
    });
  }
}
