// https://www.codewars.com/kata/56e3cbb5a28956899400073f/

function findSubarrMaxSum(arr) {
  // kadane algorithm
  let max = 0,
    sum = arr[0];
  for (let i = 1; i < arr.length; i++) {
    sum = Math.max(arr[i], sum + arr[i]);
    max = Math.max(max, sum);
  }
  // find all subarrays
  let subarr = [];
  for (let i = 0; i < arr.length; i++) {
    sum = 0;
    for (let j = i; j < arr.length; j++) {
      sum += arr[j];
      if (sum === max) subarr.push(arr.slice(i, j + 1));
    }
  }
  return subarr.length === 1 ? [subarr[0], max] : [subarr, max];
}

// TEST CASES
const test = require('../utils/simpleTester.js'),
  // prettier-ignore
  testValues = [[[-2, 1, -3, 4, -1, 2, 1, -5, 4], [[4, -1, 2, 1], 6] ],
                [[4, -1, 2, 1, -40, 1, 2, -1, 4], [[[4, -1, 2, 1], [1, 2, -1, 4]], 6]],
                [[-4, -1, -2, -1, -40, -1, -2, -1, -4], [[], 0]], 
                [[2, 1, 3, 4, 1, 2, 1, 5, 4], [[2, 1, 3, 4, 1, 2, 1, 5, 4], 23]],
                [[0, 62, 66, 37, 100, 85, 26],[ [ [ 0, 62, 66, 37, 100, 85, 26 ], [ 62, 66, 37, 100, 85, 26 ] ], 376 ]],
                [[ 19, 62, 43, -51, -38, 38, -66, -7, 89, -12, 83 ] , [ [ [ 19, 62, 43, -51, -38, 38, -66, -7, 89, -12, 83 ], [ 89, -12, 83 ] ], 160 ]]
               ];

test(findSubarrMaxSum, testValues, { tester: (a, b) => JSON.stringify(a) === JSON.stringify(b) });

// run with: node solutions/maxSubarray.js
