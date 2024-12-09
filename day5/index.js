import fs from "fs";

const inputData = fs.readFileSync("./input.txt", "utf-8").trim();
const [orderingPart, dataPart] = inputData.split("\n\n");

const ordering = orderingPart
  .split("\n")
  .map((item) => item.split("|"))
  .map((str) => str.map((s) => Number(s)));
const data = dataPart
  .split("\n")
  .map((item) => item.split(","))
  .map((str) => str.map((s) => Number(s)));

function isCorrectOrder(pageUpdates) {
  for (const order of ordering) {
    const first = order[0];
    const second = order[1];
    const indxF = pageUpdates.indexOf(first);
    const indxS = pageUpdates.indexOf(second);
    if (indxF > -1 && indxS > -1 && indxF > indxS) {
      return [false, 0];
    }
  }
  return [true, pageUpdates[(pageUpdates.length / 2) | 0]];
}

let total = 0;
for (let i = 0; i < data.length; i++) {
  const arr = data[i];
  const [isCorrect, middleNum] = isCorrectOrder(arr);
  if (isCorrect) {
    total += middleNum;
  }
}
console.log(total);

function sortCorrectly(pageUpdates) {
  for (const order of ordering) {
    const first = order[0];
    const second = order[1];
    const indxF = pageUpdates.indexOf(first);
    const indxS = pageUpdates.indexOf(second);
    if (indxF > -1 && indxS > -1 && indxF > indxS) {
      const temp = pageUpdates[indxF];
      pageUpdates[indxF] = pageUpdates[indxS];
      pageUpdates[indxS] = temp;
    }
  }
  return pageUpdates;
}

const notCorrect = data.filter((arr) => !isCorrectOrder(arr)[0]);
const corrected = [];
while (notCorrect.length > 0) {
  for (let i = 0; i < notCorrect.length; i++) {
    const arr = notCorrect[i];
    const newArr = sortCorrectly(arr);
    const [isCorrect] = isCorrectOrder(newArr);
    if (isCorrect) {
      notCorrect.splice(i, 1);
      corrected.push(newArr);
    }
  }
}

let total2 = 0;
for (let i = 0; i < corrected.length; i++) {
  const arr = corrected[i];
  const [isCorrect, middleNum] = isCorrectOrder(arr);
  if (isCorrect) {
    total2 += middleNum;
  }
}
console.log(total2);