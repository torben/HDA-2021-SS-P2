import {
  positionForCoordinates,
  isPositionInHouse,
  nonMoveableObjectsForPosition,
  coordinatesForPosition
} from "../helpers.js";

import Settings from "../settings.js";

function buildPathesFor(path, position, allPoints) {
  return [
    { x: position.x - 1, y: position.y },
    { x: position.x, y: position.y - 1 },
    { x: position.x + 1, y: position.y },
    { x: position.x, y: position.y + 1 },
    { x: position.x - 1, y: position.y + 1 },
    { x: position.x + 1, y: position.y - 1 },
    { x: position.x + 1, y: position.y + 1 },
    { x: position.x - 1, y: position.y - 1 }
  ].filter(newPath => {
    if (allPoints && allPoints.find(point => point.x === newPath.x && point.y === newPath.y)) {
      return false;
    }
    return isPositionInHouse(newPath) && !nonMoveableObjectsForPosition(newPath);
  });
}

function findFinalPath(position, pathes) {
  return pathes.find(path => {
    const currentPath = path[path.length - 1];
    return position.x === currentPath.x && position.y === currentPath.y;
  });
}

export default class WaypointBuilder {
  constructor(sprite) {
    this.sprite = sprite;
  }

  get center() {
    return this.sprite.center;
  }

  get size() {
    return { width: this.sprite.image.width, height: this.sprite.image.height };
  }

  createWaypoints(destination) {
    const scaleValue = Settings.scaleValue
    const currentPosition = positionForCoordinates({ x: this.center.x, y: this.center.y });
    const destinationPosition = positionForCoordinates({ x: destination.x + (this.size.width * scaleValue / 2), y: destination.y + (this.size.height * scaleValue / 2) });

    if (destinationPosition.x === currentPosition.x && destinationPosition.y === currentPosition.y) {
      return null;
    }
    if (!isPositionInHouse(destinationPosition) || nonMoveableObjectsForPosition(destinationPosition)) {
      return null;
    }

    let pathes = buildPathesFor(null, currentPosition, []).map(path => [path]);
    let finalPath = findFinalPath(destinationPosition, pathes);
    let i = 0;
    while (!finalPath) {
      if (i > 100) {
        return [destination];
      }

      pathes = pathes.filter(path => {
        return path.length === i + 1;
      });
      let allPoints = [];
      pathes.forEach(path => {
        path.forEach(point => {
          if (!allPoints.find(p => { return p.x === point.x && p.y === point.y; })) {
            allPoints.push(point);
          }
        });
      });

      pathes.map(path => {
        buildPathesFor(path, path[path.length-1], allPoints).map(newPath => {
          allPoints.push(newPath);
          pathes.push([...path, ...[newPath]]);
        });
      });
      if (!pathes.length) {
        break;
      }
      finalPath = findFinalPath(destinationPosition, pathes);
      i += 1;
    }
    if (finalPath) {
      this.debugPathes = pathes;
      return finalPath.map(path => coordinatesForPosition(this.sprite, path, true));
    }
    return null;
  }
}
