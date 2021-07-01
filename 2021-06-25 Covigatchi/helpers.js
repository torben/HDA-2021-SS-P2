import Settings from "./settings.js";
import { MAP_OBJECTS, MAP_BORDERS } from "./data/map.js";

export function sample(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export function decimalFormat(number) {
  return (Math.round(number * 10) / 10).toLocaleString();
}

export function positionForCoordinates({ x, y }) {
  return {
    x: Math.floor(x / Settings.scaleValue / Settings.gridSize),
    y: Math.floor(y / Settings.scaleValue / Settings.gridSize),
  };
}

export function coordinatesForPosition(sprite, { x, y }, shouldRevertScaling=false) {
  const scale = Settings.scaleValue
  const gridSize = scale * Settings.gridSize
  const fixScalingValue = shouldRevertScaling ? scale : 1;
  return {
    x: Math.round((x * gridSize + (gridSize / 2) - (scale * sprite.image.width / 2)) / fixScalingValue),
    y: Math.round((y * gridSize + (gridSize / 2) - (scale * sprite.image.height / 2)) / fixScalingValue),
  };
}

function queryMapObjectForPosition(position, field) {
  const key = Object.keys(MAP_OBJECTS).find(key => {
    if (!MAP_OBJECTS[key][field]) {
      return null;
    }
    return MAP_OBJECTS[key][field].find(searchPosition => {
      return searchPosition[0] === position.x && searchPosition[1] === position.y;
    });
  });
  if (!key) {
    return null;
  }
  const mapObject = MAP_OBJECTS[key];
  return {
    type: key,
    isMoveable: mapObject.isMoveable,
    needKey: mapObject.needKey,
    positions: mapObject.positions,
    actionPositions: mapObject.actionPositions || [],
    actionDirection: mapObject.actionDirection,
    tickValue: mapObject.tickValue
  };
}

export function mapObjectForPosition(position) {
  return queryMapObjectForPosition(position, "positions");
}

export function nonMoveableObjectsForPosition(position) {
  const obstackle = queryMapObjectForPosition(position, "positions");
  if (obstackle && !obstackle.isMoveable) {
    return obstackle;
  }
  return null;
}

export function actionMapObjectForPosition(position) {
  return queryMapObjectForPosition(position, "actionPositions");
}

export function isPositionInHouse(position) {
  return position.x >= MAP_BORDERS.minX && position.x <= MAP_BORDERS.maxX && position.y >= MAP_BORDERS.minY && position.y <= MAP_BORDERS.maxY;
}

export function logScore({ points, character, name }) {
  try {
    const data = {
      name,
      character,
      points,
      time: Date.now()
    }
    const url = "highscore/highscore.php";

    const formData = new FormData();
    formData.append("name", name);
    formData.append("character", character);
    formData.append("points", points);
    formData.append("time", Date.now());

    const request = new XMLHttpRequest();
    request.open("POST", url);
    request.send(formData);
  } catch (error) {
    console.log("Error while writing score", error);
  }
}

export async function loadScores() {
  try {
    const response = await fetch("highscore/highscore.json", { cache: "no-cache" });
    const json = await response.json();
    return json;
  } catch (error) {
    console.log("Error while reading score", error);
    return [];
  }
}

export function hasSavedGame() {
  try {
    const game = localStorage.getItem("storedGame");
    return Boolean(game);
  } catch {
    return false;
  }
}

export function saveGame(data) {
  try {
    localStorage.setItem("storedGame", JSON.stringify(data));
  } catch (error) {
    console.log("Error while saving game", error);
  }
}

export function loadGame() {
  try {
      return JSON.parse(localStorage.getItem("storedGame"));
  } catch (error) {
    console.log("Error while loading game", error);
    return null;
  }
}

export function removeSaveGame() {
  try {
    localStorage.removeItem("storedGame");
  } catch (error) {
    console.log("Error while removing game", error);
  }
}
