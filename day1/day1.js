import { leftList } from "./List1.js";
import { rightList } from "./List2.js";

// Part One
function sortBySmallestNum(array) {
  return array.sort((a, b) => a - b);
}
const sortleft = sortBySmallestNum(leftList);
const sortright = sortBySmallestNum(rightList);

let completeDistance = 0;
for (let i = 0; i < sortleft.length; i++) {
  const distance = Math.abs(sortright[i] - sortleft[i]);
  completeDistance = completeDistance + distance;
}

console.log(completeDistance, "part one result");

// Part Two
let repetition = 0;
for (const l of leftList) {
  const timesShowedUp = rightList.filter((r) => r === l).length;

  const newNum = l * timesShowedUp;
  repetition += newNum;
}

console.log(repetition, "part two result");
