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

const testA = [
  sudoku([
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ]),
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
];
console.table(testA[0]);
console.table(testA[1]);
console.log('test: ', testA[0].join('') === testA[1].join(''));
