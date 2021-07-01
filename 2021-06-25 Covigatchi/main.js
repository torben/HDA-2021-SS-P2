import GameManager from "./classes/GameManager.js";

import Menu from "./classes/Menu.js";

import CharacterSelection from "./classes/CharacterSelection.js"
import Highscore from "./classes/Highscore.js";

import Map from "./classes/Map.js";
import Player from "./classes/Player.js";
import Pet from "./classes/Pet.js";
import StatusBar from "./classes/StatusBar.js";
import TutorialButton from "./classes/TutorialButton.js";
import GameEndOverlay from "./classes/GameEndOverlay.js";
import Settings from "./settings.js";
import { PRELOAD_IMAGE_FILES } from "./constants.js";
import {
  sample,
  positionForCoordinates,
  mapObjectForPosition,
  isPositionInHouse,
  coordinatesForPosition
} from "./helpers.js";

export const sketch = new p5();

const playerStatus = {
  food: {
    percent: 1,
    tickDropValue: 0.0005,
    tickEarnValue: 0.006
  },
  relax: {
    percent: 1,
    tickDropValue: 0.0003,
    tickEarnValue: 0.0015
  },
  rest: {
    percent: 1,
    tickDropValue: 0.0002,
    tickEarnValue: 0.0007
  },
  pipikaka: {
    percent: 1,
    tickDropValue: 0.0003,
    tickEarnValue: 0.015
  },
  science: {
    percent: 0,
    tickDropValue: 0,
    tickEarnValue: 0.0002
    // tickEarnValue: 0.01
  }
};

const gameManager = new GameManager();

let p5Canvas, menu, characterSelection, highscore, map, cat, player, statusBar, tutorialButton, gameEndOverlay;
let images = {};

export function preload() {
  PRELOAD_IMAGE_FILES.forEach(imageFile => {
    const imageName = imageFile.split(".")[0];
    images[imageName] = loadImage(`assets/${imageFile}`);
  });
}

export function setup() {
  const size = Settings.canvasSize * Settings.scaleValue;
  p5Canvas = sketch.createCanvas(size, size);
  sketch.frameRate(Settings.frameRate);

  p5Canvas.parent("#canvas");

  menu = new Menu({ logo: images.logo });
  menu.animateIn();
  characterSelection = new CharacterSelection({
    logo: images.logo,
    connic: images.playerConnic,
    covick: images.playerCovick
  })
  highscore = new Highscore({
    logo: images.logo,
    connic: images.playerConnicBottom,
    covick: images.playerCovickBottom
  })
  gameEndOverlay = new GameEndOverlay();

  window.setInterval(() => gameManager.saveGame(sketch.frameCount, playerStatus), 3000);
}

export function draw() {
  scale(Settings.scaleValue);

  if (gameManager.isMenu) {
    drawMenu();
  } else if (gameManager.isCharacterSelection) {
    drawCharacterSelection();
  } else if (gameManager.isShowingHighscore) {
    drawHighscore();
  } else if (gameManager.isTutorial) {
    drawTutorial();
  } else {
    drawGame();
  }
}

function drawMenu() {
  menu.hasSavedGame = gameManager.hasSavedGame;
  menu.display();
}

function drawCharacterSelection() {
  characterSelection.display();
}

function drawHighscore() {
  highscore.display();
}

function drawGame() {
  map.display();

  const playerAction = letTimeFly();
  if (playerAction && playerAction.type === "tv") {
    image(images.tvShow, 532, 225, 77, 33);
  } else if (playerAction && playerAction.type === "bed") {
    if (!p5Canvas.canvas.classList.contains("sleeping")) {
      p5Canvas.canvas.classList.add("sleeping");
    }
  } else if (p5Canvas.canvas.classList.contains("sleeping")) {
    p5Canvas.canvas.classList.remove("sleeping");
  }

  cat.move();
  cat.display();
  player.display();
  
  if (!player.isDead) {
    tutorialButton.display();
  }

  statusBar.updatePlayerStatus(playerStatus);
  statusBar.display();

  displayDebugWaypoints();

  if (gameManager.isGameOver) {
    gameEndOverlay.display();
  }
}

function drawTutorial() {
  image(images.tutorial, 0, 0);
  tutorialButton.display();
}

export function mouseClicked() {
  if (gameManager.isMenu) {
    handleMenuButtonClicks(menu.buttons);
  } else if (gameManager.isCharacterSelection) {
    handleMenuButtonClicks(characterSelection.buttons);
  } else if (gameManager.isGameOver) {
    handleMenuButtonClicks(gameEndOverlay.buttons);
  } else if (gameManager.isShowingHighscore) {
    handleMenuButtonClicks(highscore.buttons);
  } else {
    handleGameClicks();
  }
}

function handleMenuButtonClicks(buttons) {
  const button = buttons.find(button => {
    return button.hitTest(mouseX, mouseY);
  });
  if (!button) {
    return;
  }

  if (gameManager.isMenu) {
    menu.animateOut(() => performMenuButtonClicks(button));
  } else {
    performMenuButtonClicks(button);
  }
}

function performMenuButtonClicks(button) {
  switch (button.type) {
    case "continueGame":
      clear();
      if (gameManager.loadGame(sketch.frameCount, playerStatus)) {
        initGame();
      } else {
        gameManager.startCharacterSelection();
      }
      break;
    case "startGame":
      clear();
      gameManager.startCharacterSelection();
      break;
    case "highscore":
      highscore.generateScoreEntries();
      gameManager.showHighscore();
      break;
    case "character":
      gameManager.playerName = prompt("Wie soll ich dich nennen?")
      if (gameManager.playerName && gameManager.playerName.length) {
        clear();
        gameManager.character = button.value;
        initGame();
        gameManager.startGame(sketch.frameCount);
      }
      break;
    case "menu":
      clear();
      gameManager.resetGame(playerStatus);
      menu.animateIn();
      break
  }
}

function initGame() {
  map = new Map({ backgroundImage: images.background });
  cat = new Pet({ left: images.catLeft, right: images.catRight });
  statusBar = new StatusBar(Settings.canvasSize * 0.5, playerStatus);
  tutorialButton = new TutorialButton(Settings.canvasSize - 75, 25, 50, 50);

  const character = gameManager.character;
  player = new Player({
    bottom: images[`player${character}Bottom`],
    dead: images[`player${character}Dead`],
    left: images[`player${character}Left`],
    right: images[`player${character}Right`],
    top: images[`player${character}Top`],
    head: images[`player${character}Head`],
    headBack: images[`player${character}HeadBack`],
    eating: images[`player${character}Eating`]
  });
  moveSpritesToStartPosition();
}

function handleGameClicks() {
  if (gameManager.isGameOver) {
    return;
  }

  if (tutorialButton.hitTest(mouseX, mouseY)) {
    tutorialButton.toggleMode();
    if (tutorialButton.mode === "show") {
      gameManager.hideTutorial();
    } else {
      gameManager.showTutorial();
    }
    return;
  }
  if (gameManager.isTutorial) {
    return;
  }

  let position = positionForCoordinates({ x: mouseX, y: mouseY });
  if (!isPositionInHouse(position)) {
    return;
  }
  console.log(position);
  const mapObject = mapObjectForPosition(position);
  if (mapObject) {
    if (!mapObject.actionPositions || !mapObject.actionPositions.length) {
      return;
    }
    const mapPosition = sample(mapObject.actionPositions);
    position = { x: mapPosition[0], y: mapPosition[1] };
  }

  const gridSize = Settings.gridSize * Settings.scaleValue;
  const mousePosition = {
    x: Math.round(position.x * gridSize + (gridSize / 2)),
    y: Math.round(position.y * gridSize + (gridSize / 2)),
  };
  player.goToDestination(mousePosition);
}

function letTimeFly() {
  if (!gameManager.isStarted) {
    return null;
  }
  const playerAction = player.performingAction();

  Object.keys(playerStatus).forEach(key => {
    if (!gameManager.isStarted) {
      return null;
    }
    if (playerAction && playerAction.needKey === key) {
      playerStatus[key].percent += playerStatus[key].tickEarnValue;
      if (playerAction.actionDirection) {
        player.image = player.images[playerAction.actionDirection];
      }
    } else {
      playerStatus[key].percent -= playerStatus[key].tickDropValue;
    }
    playerStatus[key].percent = Math.max(Math.min(playerStatus[key].percent, 1), 0);

    if (key !== "science" && playerStatus[key].percent === 0) {
      gameManager.playerDied(player, sketch.frameCount);
      gameEndOverlay.result = {
        gameManager,
        playerStatus
      }
      return null;
    } else if (key === "science" && playerStatus[key].percent === 1) {
      gameManager.playerFoundCure(sketch.frameCount);
      return null;
    }
  });

  return playerAction;
}

function moveSpritesToStartPosition() {
  const gridSize = Settings.gridSize;
  const playerStartPosition = {
    x: Math.round(4 * gridSize + (gridSize / 2) - (player.image.width / 2)),
    y: Math.round(12 * gridSize + (gridSize / 2) - (player.image.height / 2)),
  };
  player.x = playerStartPosition.x;
  player.y = playerStartPosition.y;

  const catStartPosition = {
    x: Math.round(3 * gridSize + (gridSize / 2) - (cat.image.width / 2)),
    y: Math.round(6 * gridSize + (gridSize / 2) - (cat.image.height / 2)),
  };
  cat.x = catStartPosition.x;
  cat.y = catStartPosition.y;
}

function displayDebugWaypoints() {
  if (!Settings.shouldShowWaypoints || !player.waypointBuilder.debugPathes || !player.waypointBuilder.debugPathes.length) {
    return;
  }
  player.waypointBuilder.debugPathes.forEach(parthPart => {
    let lastPosition = null;
    parthPart.forEach(path => {
      if (!lastPosition) {
        lastPosition = coordinatesForPosition(player, path, true);
        return;
      }
      const coords = coordinatesForPosition(player, path, true);
      const w = player.image.width / 2;
      const h = player.image.height / 2;

      line(lastPosition.x + w, lastPosition.y + h, coords.x + w, coords.y + h);
      lastPosition = coords;
    });
  });
}
