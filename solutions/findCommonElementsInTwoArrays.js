// Find a Bunch of Common Elements of Two Lists in a Certain Range
// https://www.codewars.com/kata/58161c5ac7e37d17fc00002f

function findArr(arrA, arrB, rng, wanted) {
  const filter = (v, i, arr) =>
    v >= rng[0] && v <= rng[1] && (wanted === 'even' ? v % 2 === 0 : v % 2 !== 0) && arr.indexOf(v) !== i;
  arrA = new Set(arrA.filter(filter));
  arrB = new Set(arrB.filter(filter));
  return [...arrA].filter((v) => arrB.has(v)).sort((a, b) => a - b);
}

// Test Cases
const test = require('../utils/simpleTester.js'),
  testValues = [
    [
      [[1, -2, 7, 2, 1, 3, 7, 1, 0, 2, 3], [2, -1, 1, 1, 1, 1, 2, 3, 3, 7, 7, 0], [-4, 4], 'odd'],
      [1, 3],
    ],
    [
      [[1, -2, 7, 2, 1, 3, 4, 7, 1, 0, 2, 3, 0, 4], [0, 4, 2, -1, 1, 1, 1, 1, 2, 3, 3, 7, 7, 0, 4], [-4, -1], 'even'],
      [],
    ],
    [
      [
        [8, 1, -2, 7, 2, 1, 3, 7, 1, 8, 0, -2, 2, 3],
        [2, -1, 1, 8, 1, 1, 1, -2, 2, 8, 3, 3, 7, -2, 7, 0],
        [-8, 8],
        'even',
      ],
      [-2, 2, 8],
    ],
  ];

test(
  (args) => {
    return findArr(...args);
  },
  testValues,
  { tester: (a, b) => a.toString() === b.toString() }
);
