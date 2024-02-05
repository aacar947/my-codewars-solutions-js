var Sudoku = function (data) {
  const N = data.length;
  const srN = Math.sqrt(N);
  function chkRowsAndCols() {
    for (let i = 0; i < N; i++) {
      const row = data[i];
      const col = data.map((r) => r[i]);
      if (
        (row.length === new Set(row).size || !row.every((v) => typeof v === 'number' && v >= 1 && v <= N)) &&
        col.length === new Set(col).size
      )
        return false;
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
      console.log(data);
      if (N < 1 || data.every((r) => r.length !== N) || Math.floor(srN) !== srN) return false;
      return chkRowsAndCols() && chkSubGrids();
    },
  };
};

console.log(
  Sudoku([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
  ]).isValid()
);
console.log(Sudoku([[2]]).isValid());
console.log(Sudoku([[true]]).isValid());
