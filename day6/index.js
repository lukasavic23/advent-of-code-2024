import fs from "fs";

const inputData = fs.readFileSync("./input.txt", "utf-8").trim().split("\n");

let rowI = 0; // starting row index
let posI = 0; // starting index in row

for (let i = 0; i < inputData.length; i++) {
  const row = inputData[i];
  for (let j = 0; j < row.length; j++) {
    const item = row[j];
    if (item === "^") {
      rowI = i;
      posI = j;
      break;
    }
  }
}

const UP = 0;
const DOWN = 1;
const RIGHT = 2;
const LEFT = 3;

let currentDirection = UP;

const nextDirection = new Map();
nextDirection.set(UP, RIGHT);
nextDirection.set(DOWN, LEFT);
nextDirection.set(RIGHT, DOWN);
nextDirection.set(LEFT, UP);

const directionMap = new Map();
directionMap.set(UP, [-1, 0]);
directionMap.set(DOWN, [1, 0]);
directionMap.set(RIGHT, [0, 1]);
directionMap.set(LEFT, [0, -1]);

const visitedPositions = new Set();
while (true) {
  visitedPositions.add(`row index: ${rowI}, position index: ${posI}`);

  const nextRow = rowI + directionMap.get(currentDirection)[0];
  const nextPosition = posI + directionMap.get(currentDirection)[1];

  const isRowInBound = nextRow >= 0 && nextRow < inputData.length;
  const isPositionInBound =
    nextPosition >= 0 && nextPosition < inputData[0].length;
  if (!(isRowInBound && isPositionInBound)) {
    break;
  } else if (inputData[nextRow][nextPosition] === "#") {
    currentDirection = nextDirection.get(currentDirection);
  } else {
    rowI = nextRow;
    posI = nextPosition;
  }
}
console.log(visitedPositions.size, "visited positions");
