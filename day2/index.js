import fs from "fs";

function formatTxtToArray(file) {
  return fs
    .readFileSync(file, "utf-8")
    .trim()
    .split("\n")
    .map((line) => line.split(/\s/))
    .map((row) => row.map((bit) => Number(bit)));
}
const inputData = formatTxtToArray("./input.txt");

function isSafelyDecreasing(arr) {
  return arr.every((num, idx, iterArr) => {
    if (idx === 0) return true;

    const currentNum = num;
    const prevNum = iterArr[idx - 1];
    const isDistanceSafe =
      Math.abs(prevNum - currentNum) >= 1 &&
      Math.abs(prevNum - currentNum) <= 3;
    const isDecreasing = currentNum < prevNum;

    return isDecreasing && isDistanceSafe;
  });
}

function isSafelyIncreasing(arr) {
  return arr.every((num, idx, iterArr) => {
    if (idx === 0) return true;

    const currentNum = num;
    const prevNum = iterArr[idx - 1];
    const isDistanceSafe =
      Math.abs(prevNum - currentNum) >= 1 &&
      Math.abs(prevNum - currentNum) <= 3;
    const isIncreasing = currentNum > prevNum;

    return isIncreasing && isDistanceSafe;
  });
}

const isSafe = (arr) => isSafelyDecreasing(arr) || isSafelyIncreasing(arr);

let safeReportsCount = 0;
for (let i = 0; i < inputData.length; i++) {
  const arr = inputData[i];

  if (isSafe(arr)) {
    safeReportsCount++;
  }
}

console.log(safeReportsCount, "part one solution");

let safeTolerateCount = 0;
for (let i = 0; i < inputData.length; i++) {
  const arr = inputData[i];

  if (isSafe(arr)) {
    safeTolerateCount++;
    continue;
  }

  for (let idx = 0; idx < arr.length; idx++) {
    const copy = arr.slice(0, idx).concat(arr.slice(idx + 1));
    if (isSafe(copy)) {
      safeTolerateCount++;
      break;
    }
  }
}

console.log(safeTolerateCount, "part two solution");
