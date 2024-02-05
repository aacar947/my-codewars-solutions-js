// https://www.codewars.com/kata/540afbe2dc9f615d5e000425

var Sudoku = function (data) {
  const N = data.length;
  const srN = Math.sqrt(N);
  function chkRowsAndCols() {
    for (let i = 0; i < N; i++) {
      const row = data[i];
      const col = data.map((r) => r[i]);
      if (row.length !== new Set(row).size || !row.every((v) => typeof v === 'number' && v >= 1 && v <= N))
        return false;
      if (col.length !== new Set(col).size) return false;
    }
    return true;
  }
  function chkSubGrids() {
    for (let i = 0; i < srN; i++) {
      for (let j = 0; j < srN; j++) {
        const sG = data
          .map((r) => r.slice(j * srN, j * srN + srN))
          .slice(i * srN, i * srN + srN)
          .flat();
        if (sG.length !== new Set(sG).size) return false;
      }
    }
    return true;
  }
  return {
    isValid: function () {
      if (N < 1 || data.every((r) => r.length !== N) || Math.floor(srN) !== srN) return false;
      return chkRowsAndCols() && chkSubGrids();
    },
  };
};

// TEST CASES
// prettier-ignore
const goodSudoku1 =[
  [7,8,4, 1,5,9, 3,2,6],
  [5,3,9, 6,7,2, 8,4,1],
  [6,1,2, 4,3,8, 7,5,9],
  [9,2,8, 7,1,5, 4,6,3],
  [3,5,7, 8,4,6, 1,9,2],
  [4,6,1, 9,2,3, 5,8,7],
  [8,7,6, 3,9,4, 2,1,5],
  [2,4,3, 5,6,1, 9,7,8],
  [1,9,5, 2,8,7, 6,3,4]
];

const goodSudoku2 = [
  [1, 4, 2, 3],
  [3, 2, 4, 1],
  [4, 1, 3, 2],
  [2, 3, 1, 4],
];

const badSudoku1 = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
];

const badSudoku2 = [[1, 2, 3, 4, 5], [1, 2, 3, 4], [1, 2, 3, 4], [1]];

const testValues = [
  [goodSudoku1, true],
  [goodSudoku2, true],
  [badSudoku1, false],
  [badSudoku2, false],
];

console.log(Sudoku(goodSudoku1).isValid());

const test = require('../utils/simpleTester.js');

test(Sudoku, testValues, { tester: (a, b) => a.isValid() === b });
