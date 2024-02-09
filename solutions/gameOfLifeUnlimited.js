// https://www.codewars.com/kata/52423db9add6f6fc39000354

function getGeneration(_cells, gen) {
  if (!gen) return _cells;

  const cells = expand(_cells);
  const nextGen = [[]];
  const getT = (x, y) => {
    let t = 0;
    for (i = -1; i < 2; i++) {
      for (j = -1; j < 2; j++) {
        t += (cells[x + i] && cells[x + i][y + j]) || 0;
      }
    }
    return t;
  };
  let minX = cells.length,
    maxX = 0,
    minY = cells[0].length,
    maxY = 0;
  cells.forEach((row, x) => {
    nextGen[x] = [];
    row.forEach((cell, y) => {
      const t = getT(x, y);
      const next = t < 3 || t > 4 ? 0 : t === 3 || cells[x][y] ? 1 : 0;
      if (next) {
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
      }
      nextGen[x][y] = next;
    });
  });
  return getGeneration(trim(nextGen, minX, maxX, minY, maxY), --gen);
}

function expand(arr2d) {
  const space = new Array(arr2d[0].length);
  return [space, ...arr2d, space].map((r) => [0, ...r, 0]);
}

function trim(arr2d, minX, maxX, minY, maxY) {
  const rowTrimed = arr2d.filter((_, i) => i >= minX && i <= maxX);
  return rowTrimed.map((r) => r.filter((_, i) => i >= minY && i <= maxY));
}

// Test cases
const test = require('../utils/simpleTester.js'),
  // prettier-ignore
  testValues = [[[[
    [1, 0, 0],
    [0, 1, 1],
    [1, 1, 0]],2,],
    [[1, 0, 1],
     [0, 1, 1],
     [0, 1, 0]]]];

test(
  (args) => {
    return getGeneration(args[0], args[1]);
  },
  testValues,
  { tester: (a, b) => a.toString() === b.toString() }
);
