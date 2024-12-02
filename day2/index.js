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
const inputDataTwo = formatTxtToArray("./input2.txt");

let safeReportsCount = 0;
for (let i = 0; i < inputData.length; i++) {
  const arr = inputData[i];
  const isSafelyDecreasing = () =>
    arr.every((num, idx, iterArr) => {
      if (idx === 0) return true;

      const currentNum = num;
      const prevNum = iterArr[idx - 1];
      const isDistanceSafe =
        Math.abs(prevNum - currentNum) >= 1 &&
        Math.abs(prevNum - currentNum) <= 3;
      const isDecreasing = currentNum < prevNum;

      return isDecreasing && isDistanceSafe;
    });

  const isSafelyIncreasing = () =>
    arr.every((num, idx, iterArr) => {
      if (idx === 0) return true;

      const currentNum = num;
      const prevNum = iterArr[idx - 1];
      const isDistanceSafe =
        Math.abs(prevNum - currentNum) >= 1 &&
        Math.abs(prevNum - currentNum) <= 3;
      const isIncreasing = currentNum > prevNum;

      return isIncreasing && isDistanceSafe;
    });

  const isSafe = isSafelyDecreasing() || isSafelyIncreasing();
  if (isSafe) {
    safeReportsCount++;
  }
}

let safeTolerateCount = 0;
for (let i = 0; i < inputDataTwo.length; i++) {
  const arr = inputDataTwo[i];

  const isAlmostSafelyDecreasing = () => {
    let mismatches = 0;
    return arr.every((num, idx, iterArr) => {
      if (idx === 0) return true;

      const currentNum = num;
      const prevNum = iterArr[idx - 1];
      const isDistanceSafe =
        prevNum - currentNum >= 1 && prevNum - currentNum <= 3;
      const isDecreasing = currentNum < prevNum;

      if (!isDistanceSafe) {
        mismatches++;
      }

      if (mismatches > 1) {
        return false;
      }

      return isDecreasing && isDistanceSafe;
    });
  };

  const isAlmostSafelyIncreasing = () => {
    let mismatches = 0;
    return arr.every((num, idx, iterArr) => {
      if (idx === 0) return true;

      const currentNum = num;
      const prevNum = iterArr[idx - 1];
      const isDistanceSafe =
        prevNum - currentNum >= 1 && prevNum - currentNum <= 3;
      const isIncreasing = currentNum > prevNum;

      if (!isDistanceSafe) {
        mismatches++;
      }

      if (mismatches > 1) {
        return false;
      }

      return isIncreasing && isDistanceSafe;
    });
  };

  const isSafe = isAlmostSafelyDecreasing() || isAlmostSafelyIncreasing();
  if (isSafe) {
    safeTolerateCount++;
  }
}

console.log(safeTolerateCount, "count");
