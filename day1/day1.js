import { leftList } from "./List1.js";
import { rightList } from "./List2.js";

function sortBySmallestNum(array) {
  return array.sort((a, b) => a - b);
}
const sortleft = sortBySmallestNum(leftList);
const sortright = sortBySmallestNum(rightList);

let completeDistance = 0;
for (let i = 0; i < sortleft.length; i++) {
  const newEntry = [sortleft[i], sortright[i]];

  const distance = Math.abs(sortright[i] - sortleft[i]);
  completeDistance = completeDistance + distance;
}
