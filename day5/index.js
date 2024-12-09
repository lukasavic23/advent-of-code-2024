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
    if (
      indxF > -1 &&
      indxS > -1 &&
      (indxF > indxS)
    ) {
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
