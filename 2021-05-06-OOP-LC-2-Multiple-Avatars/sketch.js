import Avatar from "./Avatar.js";
import Button from "./Button.js";

let avatar = new Avatar(100, 100, 100);
let avatar2 = new Avatar(230, 100, 100);
let button = new Button(30, 210, 100, 40, "Happy");
let button2 = new Button(30, 250, 100, 40, "Sad");

let statusButton = new Button(30, 30, 100, 40, "");

let avatarSelectionButton1 = new Button(80, 180, 100, 40, "Links");
let avatarSelectionButton2 = new Button(200, 180, 100, 40, "Rechts");
let activeAvatar = avatar;

function draw() {
  clear();
  avatar.display();
  avatar2.display();
  button.display();
  button2.display();

  avatarSelectionButton1.display();
  avatarSelectionButton2.display();

  statusButton.display();
  if (activeAvatar === avatar) {
    statusButton.text = "Links";
  } else {
    statusButton.text = "Rechts";
  }
}


function mouseClicked() {
  if (button.hitTest()) {
    activeAvatar.state = "happy";
  } else if (button2.hitTest()) {
    activeAvatar.state = "sad";
  } else if (avatarSelectionButton1.hitTest()) {
    activeAvatar = avatar;
  } else if (avatarSelectionButton2.hitTest()) {
    activeAvatar = avatar2;
  } else {
    activeAvatar.state = "normal";
  }
}
