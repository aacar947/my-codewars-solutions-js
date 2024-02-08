// https://www.codewars.com/kata/5296bc77afba8baa690002d7
function sudoku(data) {
  while (!data.every((r) => r.every((v) => v))) {
    data.forEach((r, x) => {
      r.forEach((v, y) => {
        if (v) return;
        const pS = getPS(data, x, y);
        if (pS.length === 1) data[x][y] = pS[0];
      });
    });
  }
  return data;
}

function getPS(data, x, y) {
  const row = data[x].filter((v) => v);
  const col = data.map((r) => r[y]).filter((v) => v);
  const i = Math.floor(x / 3) * 3;
  const j = Math.floor(y / 3) * 3;
  const _grid = data
    .slice(i, i + 3)
    .map((r) => r.slice(j, j + 3))
    .flat()
    .filter((v) => v);
  const union = new Set([...row, ...col, ..._grid]);
  return [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((v) => !union.has(v));
}

const testValues = [
  [
    [
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9],
    ],
    [
      [5, 3, 4, 6, 7, 8, 9, 1, 2],
      [6, 7, 2, 1, 9, 5, 3, 4, 8],
      [1, 9, 8, 3, 4, 2, 5, 6, 7],
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 6, 1, 5, 3, 7, 2, 8, 4],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, 1, 7, 9],
    ],
  ],
  [
    [
      [0, 4, 6, 0, 0, 0, 0, 0, 0],
      [9, 0, 2, 0, 6, 0, 0, 0, 8],
      [0, 0, 8, 4, 0, 0, 2, 5, 0],
      [0, 0, 0, 8, 0, 0, 0, 7, 0],
      [5, 0, 0, 7, 0, 2, 0, 0, 3],
      [0, 1, 0, 0, 0, 6, 0, 0, 0],
      [0, 6, 4, 0, 0, 3, 9, 0, 0],
      [3, 0, 0, 0, 8, 0, 1, 0, 2],
      [0, 0, 0, 0, 0, 0, 7, 3, 0],
    ],
    [
      [1, 4, 6, 2, 5, 8, 3, 9, 7],
      [9, 5, 2, 3, 6, 7, 4, 1, 8],
      [7, 3, 8, 4, 9, 1, 2, 5, 6],
      [6, 2, 3, 8, 4, 9, 5, 7, 1],
      [5, 8, 9, 7, 1, 2, 6, 4, 3],
      [4, 1, 7, 5, 3, 6, 8, 2, 9],
      [2, 6, 4, 1, 7, 3, 9, 8, 5],
      [3, 7, 5, 9, 8, 4, 1, 6, 2],
      [8, 9, 1, 6, 2, 5, 7, 3, 4],
    ],
  ],
  [
    [
      [6, 0, 0, 1, 0, 8, 2, 0, 3],
      [0, 2, 0, 0, 4, 0, 0, 9, 0],
      [8, 0, 3, 0, 0, 5, 4, 0, 0],
      [5, 0, 4, 6, 0, 7, 0, 0, 9],
      [0, 3, 0, 0, 0, 0, 0, 5, 0],
      [7, 0, 0, 8, 0, 3, 1, 0, 2],
      [0, 0, 1, 7, 0, 0, 9, 0, 6],
      [0, 8, 0, 0, 3, 0, 0, 2, 0],
      [3, 0, 2, 9, 0, 4, 0, 0, 5],
    ],
    [
      [6, 4, 5, 1, 9, 8, 2, 7, 3],
      [1, 2, 7, 3, 4, 6, 5, 9, 8],
      [8, 9, 3, 2, 7, 5, 4, 6, 1],
      [5, 1, 4, 6, 2, 7, 3, 8, 9],
      [2, 3, 8, 4, 1, 9, 6, 5, 7],
      [7, 6, 9, 8, 5, 3, 1, 4, 2],
      [4, 5, 1, 7, 8, 2, 9, 3, 6],
      [9, 8, 6, 5, 3, 1, 7, 2, 4],
      [3, 7, 2, 9, 6, 4, 8, 1, 5],
    ],
  ],
];

const test = require('../utils/simpleTester.js');

test(sudoku, testValues, { tester: (a, b) => a.toString() === b.toString() });
