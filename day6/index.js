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

let rowI2 = rowI;
let posI2 = posI;

const visitedPositions = new Set();
while (true) {
  visitedPositions.add(`${rowI},${posI}`);

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

const inputData2 = inputData.map((row) =>
  row.split(",").flatMap((row) => row.split(""))
);

function willGuardLoop(newRowI, newPosI) {
  if (inputData2[newRowI][newPosI] === "#") {
    return false;
  }
  inputData2[newRowI][newPosI] = "#";

  let currentDirection2 = UP;
  const visitedPositions2 = new Set();

  let tempRowI = rowI2;
  let tempPosI = posI2;

  while (true) {
    if (visitedPositions2.has(`${tempRowI}-${tempPosI}-${currentDirection2}`)) {
      inputData2[newRowI][newPosI] = ".";
      return true;
    }
    visitedPositions2.add(`${tempRowI}-${tempPosI}-${currentDirection2}`);

    const nextRow = tempRowI + directionMap.get(currentDirection2)[0];
    const nextPosition = tempPosI + directionMap.get(currentDirection2)[1];

    const isRowInBound = nextRow >= 0 && nextRow < inputData.length;
    const isPositionInBound =
      nextPosition >= 0 && nextPosition < inputData[0].length;
    if (!(isRowInBound && isPositionInBound)) {
      inputData2[newRowI][newPosI] = ".";
      return false;
    } else if (inputData2[nextRow][nextPosition] === "#") {
      currentDirection2 = nextDirection.get(currentDirection2);
    } else {
      tempRowI = nextRow;
      tempPosI = nextPosition;
    }
  }
}

let loops = 0;
visitedPositions.forEach((position) => {
  const [i, j] = position.split(",");
  if (i == rowI2 && j == posI2) return;
  const willLoop = willGuardLoop(i, j);
  if (willLoop) {
    loops++;
  }
});
console.log(loops, "possible loops");
