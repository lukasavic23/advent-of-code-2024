import fs from "fs";

const inputData = fs.readFileSync("./input.txt", "utf-8");

const match = inputData.match(/(mul)\([0-9]+,[0-9]+\)/g);

let sum = 0;
match.forEach((mt) => {
  const [first, second] = mt.match(/[0-9]+/g);
  const result = +first * +second;
  sum += result;
});

console.log(sum, "part one result");
const matchedOccurencies = inputData.match(/(mul)\([0-9]+,[0-9]+\)|do(|n't)\(\)/g);

const muls = [];
let isPushing = true;

for (const mt of matchedOccurencies) {
  if (mt === "don't()") {
    isPushing = false;
  } else if (mt === "do()") {
    isPushing = true;
  } else if (isPushing) {
    muls.push(mt);
  }
}
let sum2 = 0;
muls.forEach((mt) => {
  const [first, second] = mt.match(/[0-9]+/g);
  const result = +first * +second;
  sum2 += result;
});

console.log(sum2, "part two result");
