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
