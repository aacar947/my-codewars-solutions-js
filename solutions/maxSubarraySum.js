// https://www.codewars.com/kata/54521e9ec8e60bc4de000d6c

const maxSequence = (arr) => {
  if (arr.length === 0) return 0;
  // kadane algorithm
  let max = 0,
    sum = arr[0];
  for (let i = 1; i < arr.length; i++) {
    sum = Math.max(arr[i], sum + arr[i]);
    max = Math.max(max, sum);
  }
  return max;
};

// Test cases
const test = require('../utils/simpleTester.js'),
  testValues = [
    [[], 0],
    [[-2, 1, -3, 4, -1, 2, 1, -5, 4], 6],
    [[-2, -1, -3, -4, 1, -2, -1, -5, -4], 1],
    [[-2, -1, -3, -4, -1, -2, -1, -5, -4], 0],
  ];

test(maxSequence, testValues);

// run with: node solutions/maxSubarraySum.js
