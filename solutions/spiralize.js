//https://www.codewars.com/kata/534e01fbbb17187c7e0000c6

function spiralize(n) {
  const dir = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  const grid = new Array(n).fill(0).map(() => new Array(n).fill(0));
  let x = 0,
    y = -1,
    dirIndex = 0,
    steps = n,
    edge = 0,
    dec = 1;
  while (steps >= 1) {
    const _dir = dir[dirIndex % 4];
    for (let i = 0; i < steps; i++) {
      x += _dir[0];
      y += _dir[1];
      grid[x][y] = 1;
    }
    if (steps === 1) break;
    dirIndex++;
    steps -= edge % 2 === 0 ? dec : 0;
    dec = 2;
    edge++;
  }
  return grid;
}

const testValues = [
  [
    5,
    [
      [1, 1, 1, 1, 1],
      [0, 0, 0, 0, 1],
      [1, 1, 1, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1],
    ],
  ],
  [
    8,
    [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
    ],
  ],
];

const test = require('../utils/simpleTester.js');

test(spiralize, testValues, { tester: (a, b) => a.toString() === b.toString() });
