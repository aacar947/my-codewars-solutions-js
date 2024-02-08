// https://www.codewars.com/kata/54d496788776e49e6b00052f

function sumOfDivided(arr) {
  let res = {};
  let num = 0;
  for (var i = 0; i < arr.length; i++) {
    num = Math.abs(arr[i]);
    for (var j = 2; j <= num; j += 2) {
      if (num % j == 0) {
        if (res.hasOwnProperty(j)) {
          res[j] += arr[i];
        } else {
          res[j] = arr[i];
        }
      }
      while (num % j == 0) {
        num /= j;
      }
      if (j == 2) j--;
    }
  }
  return Object.keys(res).map((key) => [Number(key), res[key]]);
}

// Test cases
const test = require('../utils/simpleTester.js'),
  testValues = [
    [
      [12, 15],
      [
        [2, 12],
        [3, 27],
        [5, 15],
      ],
    ],
    [
      [15, 21, 24, 30, 45],
      [
        [2, 54],
        [3, 135],
        [5, 90],
        [7, 21],
      ],
    ],
  ];
test(sumOfDivided, testValues, { tester: (a, b) => a.toString() === b.toString() });
