// https://www.codewars.com/kata/54e6533c92449cc251001667/train/javascript

const uniqueInOrder = function (iter) {
  if (typeof iter === 'string') iter = iter.split('');
  return iter.filter((e, i) => e !== iter[i - 1]);
};

// TEST CASES
const test = require('../utils/simpleTester.js');
const testValues = [
  ['AAAABBBCCDAABBB', ['A', 'B', 'C', 'D', 'A', 'B']],
  [
    [1, 2, 2, 3, 3],
    [1, 2, 3],
  ],
];

test(uniqueInOrder, testValues, { tester: (a, b) => a.toString() === b.toString() });

// run with: node solutions/uniqueInOrder.js
