import Avatar from "./Avatar.js";
import Button from "./Button.js";

let avatar = new Avatar(100, 100, 100);
let button = new Button(30, 200, 100, 40, "Happy");
let button2 = new Button(30, 240, 100, 40, "Sad");

function draw() {
  clear();
  avatar.display();
  button.display();
  button2.display();
}

function mouseClicked() {
  if (button.hitTest()) {
    avatar.state = "happy";
  } else if (button2.hitTest()) {
    avatar.state = "sad";
  } else {
    avatar.state = "normal";
  }
  console.log(avatar.state);
}