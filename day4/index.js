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
console.log(result);
