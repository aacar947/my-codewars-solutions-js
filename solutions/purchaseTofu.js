// https://www.codewars.com/kata/57d4ecb8164a67b97c00003c

function buyTofu(cost, box) {
  return box.split(' ').reduce(
    (ac, v, i, arr) => {
      if (v === 'mon') ac[0] += 1;
      if (v === 'monme') ac[1] += 1;
      ac[2] = ac[0] + ac[1] * 60;
      if (i === arr.length - 1) {
        const minMonme = Math.min(ac[1], (cost - (cost % 60)) / 60);
        const change = cost - minMonme * 60;
        ac[3] = minMonme + change;
        if (change > ac[0]) ac = 'leaving the market';
      }
      return ac;
    },
    [0, 0, 0, 0]
  );
}

// Test Cases
const test = require('../utils/simpleTester.js'),
  testValues = [
    [
      [
        124,
        'mon mon mon mon mon apple mon mon mon mon mon mon mon monme mon mon monme mon mon mon mon cloth monme mon mon mon mon mon mon mon mon cloth mon mon monme mon mon mon mon monme mon mon mon mon mon mon mon mon mon mon mon mon mon',
      ],
      [45, 5, 345, 6],
    ],
    [[5, 'mon monme'], 'leaving the market'],
    [
      [
        124,
        'mon mon mon mon mon apple mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon monme mon mon mon mon cloth mon mon mon mon mon mon mon mon mon cloth mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon mon',
      ],
      [121, 1, 181, 65],
    ],
  ];

test(
  (arg) => {
    return buyTofu(...arg);
  },
  testValues,
  { tester: (a, b) => (typeof b === 'string' ? a === b : a.toString() === b.toString()) }
);
