export const MAP_OBJECTS = {
  tv: {
    isMoveable: false,
    needKey: "relax",
    positions: [
      [12, 5],
      [13, 5]
    ],
    actionPositions: [
      [12, 7],
      [13, 7]
    ],
    actionDirection: "headBack"
  },
  science: {
    isMoveable: false,
    needKey: "science",
    positions: [
      [8, 5],
      [9, 5],
      [8, 6],
      [9, 6],
      [8, 7],
      [9, 7]
    ],
    actionPositions: [
      [10, 6]
    ],
    actionDirection: "left"
  },
  kitchen: {
    isMoveable: false,
    needKey: "food",
    positions: [
      [9, 10],
      [9, 11],
      [9, 12],
    ],
    actionPositions: [
      [10, 12]
    ],
    actionDirection: "eating"
  },
  bed: {
    isMoveable: true,
    needKey: "rest",
    positions: [
      [5, 5],
      [5, 6]
    ],
    actionPositions: [
      [5, 5]
    ],
    actionDirection: "head"
  },
  toilet: {
    isMoveable: true,
    needKey: "pipikaka",
    positions: [
      [7, 12]
    ],
    actionPositions: [
      [7, 12]
    ],
    actionDirection: "top"
  },
  obstacles: {
    isMoveable: false,
    positions: [
      [2, 4],
      [3, 4],
      [4, 4],
      [5, 4],
      [6, 4],
      [7, 4],
      [8, 4],
      [9, 4],
      [10, 4],
      [11, 4],
      [12, 4],
      [13, 4],
      [14, 4],
      [15, 4],
      [2, 5],
      [3, 5],
      [4, 5],
      [6, 5],
      [7, 5],
      [10, 5],
      [11, 5],
      [15, 5],
      [2, 6],
      [7, 6],
      [15, 6],
      [2, 7],
      [7, 7],
      [15, 7],
      [2, 8],
      [3, 8],
      [4, 8],
      [6, 8],
      [7, 8],
      [8, 8],
      [9, 8],
      [15, 8],
      [2, 9],
      [3, 9],
      [15, 9],
      [2, 10],
      [3, 10],
      [6, 10],
      [8, 10],
      [12, 10],
      [13, 10],
      [15, 10],
      [2, 11],
      [3, 11],
      [6, 11],
      [8, 11],
      [12, 11],
      [13, 11],
      [15, 11],
      [2, 12],
      [3, 12],
      [6, 12],
      [8, 12],
      [15, 12],
      [2, 13],
      [3, 13],
      [4, 13],
      [5, 13],
      [6, 13],
      [7, 13],
      [8, 13],
      [9, 13],
      [10, 13],
      [11, 13],
      [12, 13],
      [13, 13],
      [14, 13],
      [15, 13],
    ]
  }
};

export const MAP_BORDERS = {
  minX: 3,
  minY: 5,
  maxX: 14,
  maxY: 12
};
