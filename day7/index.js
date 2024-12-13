import fs from "fs";

const inputData = fs
  .readFileSync("./input.txt", "utf-8")
  .trim()
  .split("\n")
  .map((str) => {
    const [result, combinators] = str.split(": ");
    const numbers = combinators.split(" ");
    return {
      result: Number(result),
      numbers: numbers.map((n) => Number(n)),
    };
  });

const operators = ["*", "+"];
const operators2 = ["*", "+", "||"];

function willItEquate(obj, operators) {
  const { result, numbers } = obj;

  function findCombinations(operators, length) {
    let combination = [[]];
    for (let i = 0; i < length; i++) {
      const tempCombination = [...combination];
      combination = [];
      for (const operator of operators) {
        for (const comb of tempCombination) {
          combination.push([...comb, operator]);
        }
      }
    }
    return combination;
  }

  const tuples = findCombinations(operators, numbers.length - 1);
  const possibleResults = [];
  for (const arr of tuples) {
    let result = numbers[0];
    for (let i = 0; i < arr.length; i++) {
      const operator = arr[i];
      if (operator === "*") {
        result = result * numbers[i + 1];
      } else if (operator === "+") {
        result = result + numbers[i + 1];
      } else if (operator === "||") {
        result = Number(String(result) + numbers[i + 1]);
      }
    }
    possibleResults.push(result);
  }  
  return possibleResults.includes(result);
}

let count = 0;
for (const input of inputData) {
  const isGood = willItEquate(input, operators);
  if (isGood) {
    count = count + input.result;
  }
}
console.log(count, "part one solution");

let count2 = 0;
for (const input of inputData) {
  const isGood = willItEquate(input, operators2);
  if (isGood) {
    count2 = count2 + input.result;
  }
}
console.log(count2, "part two solution");
