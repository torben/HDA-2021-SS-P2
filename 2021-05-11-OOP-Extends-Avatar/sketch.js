import Avatar from "./Avatar.js";
import MenuButton from "./MenuButton.js";
import ColorButton from "./ColorButton.js";

let avatars = [
  new Avatar(0, 0, 100)
];
let tintColor = "orange";

let buttons = [
  new ColorButton("Grün", "#79FF9F"),
  new ColorButton("Rot", "#FF5151"),
  new ColorButton("Blau", "blue"),
  new ColorButton("Orange", "orange"),
  new ColorButton("Braun", "brown")
];

let addNewAvatarButton = new MenuButton(20, 20, "Avatar hinzufügen");
let clearAvatarsButton = new MenuButton(180, 20, "Avatare löschen");

function draw() {
  clear();

  addNewAvatarButton.display();
  clearAvatarsButton.display();

  let x = 20;
  let y = 80;
  avatars.forEach(avatar => {
    avatar.x = x;
    avatar.y = y;
    avatar.tintColor = tintColor;
    avatar.display();
    x += avatar.size + 10;
  });

  x = 20;
  y = 200;
  buttons.forEach(button => {
    button.x = x;
    button.y = y;
    button.display();
    y += button.height;
  });
}

function mouseClicked() {
  buttons.forEach(button => {
    if (button.hitTest()) {
      tintColor = button.tintColor;
    }
  });

  if (addNewAvatarButton.hitTest()) {
    avatars.push(new Avatar(0, 0, 100));
  }
  if (clearAvatarsButton.hitTest()) {
    avatars = [new Avatar(0, 0, 100)];
  }
}