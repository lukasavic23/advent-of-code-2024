import fs from "fs";

const inputData = fs
  .readFileSync("./input.txt", "utf-8")
  .trim()
  .split("\n")
  .map((line) => line.split(/\s/))
  .map((line) => line[0].split(""));

function traverseColsToRows(arr) {
  return arr[0].map((_, idx) => arr.map((row) => row[idx]));
}
function traversDiagToBR(arr) {
  const diagonalTL = [];
  for (let k = 0; k < arr.length * 2 - 1; k++) {
    const diagonal = [];
    for (let j = 0; j <= k; j++) {
      const i = k - j;
      if (i < arr.length && j < arr.length) {
        diagonal.push(arr[i][j]);
      }
    }
    diagonalTL.push(diagonal);
  }
  return diagonalTL;
}
function traverseDiagToTR(arr) {
  const diagonalTR = [];
  for (let k = 0; k < arr.length * 2 - 1; k++) {
    const diagonal = [];
    for (let j = 0; j <= k; j++) {
      const i = k - j;
      if (i < arr.length && j < arr.length) {
        diagonal.push(arr[i][arr.length - j - 1]);
      }
    }
    diagonalTR.push(diagonal);
  }
  return diagonalTR;
}

function getMatches(arr) {
  let counter = 0;
  for (const item of arr) {
    if (item.length < 4) continue;
    const arr = item.join("");
    const match = arr.match(/(?=(XMAS))|(?=(SAMX))/g);
    if (match) {
      counter = counter + match.length;
    }
  }
  return counter;
}

const firstMatch = getMatches(inputData);
const secondMatch = getMatches(traverseColsToRows(inputData));
const thirdMatch = getMatches(traversDiagToBR(inputData));
const fourthMatch = getMatches(traverseDiagToTR(inputData));

const result = firstMatch + secondMatch + thirdMatch + fourthMatch;
console.log(result, "part one solution");

const patterns = [
  ["M", "M", "S", "S"],
  ["S", "S", "M", "M"],
  ["M", "S", "M", "S"],
  ["S", "M", "S", "M"],
];
function satisfiesPattern(items, patterns) {
  return patterns.some(
    ([aboveLeft, aboveRight, belowLeft, belowRight]) =>
      items[0] === aboveLeft &&
      items[1] === aboveRight &&
      items[2] === belowLeft &&
      items[3] === belowRight
  );
}

let counter = 0;
for (let i = 0; i < inputData.length; i++) {
  const arr = inputData[i];
  if (i === 0 || i === inputData.length - 1) continue;

  for (let j = 0; j < arr.length; j++) {
    const lt = arr[j];
    if (lt !== "A") continue;
    let aboveLeft = undefined;
    if (inputData?.[i - 1]?.[j - 1] !== undefined) {
      aboveLeft = inputData[i - 1][j - 1];
    }
    let aboveRight = undefined;
    if (inputData?.[i - 1]?.[j + 1] !== undefined) {
      aboveRight = inputData[i - 1][j + 1];
    }
    let belowLeft = undefined;
    if (inputData?.[i + 1]?.[j - 1] !== undefined) {
      belowLeft = inputData[i + 1][j - 1];
    }
    let belowRight = undefined;
    if (inputData?.[i + 1]?.[j + 1] !== undefined) {
      belowRight = inputData[i + 1][j + 1];
    }
    const letters = [aboveLeft, aboveRight, belowLeft, belowRight];
    const checkIfExits = letters.every((letter) => letter !== undefined);
    if (!checkIfExits) continue;
    
    if (satisfiesPattern(letters, patterns)) {
      counter++
    }
  }
}
console.log(counter, "part two solution");
