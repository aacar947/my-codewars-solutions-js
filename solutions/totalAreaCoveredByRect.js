//https://www.codewars.com/kata/55dcdd2c5a73bdddcb000044

function calculate(recs) {
  if (recs.length === 0) return 0;
  //Determine and sort the unique X values (minX and maxX) for all rectangles in the array.
  let xs = new Set();
  recs.forEach((r) => {
    xs.add(r[0]).add(r[2]);
  });
  xs = Array.from(xs).sort((a, b) => a - b);
  const splitedRecs = xs.map(() => []);

  recs
    .sort((a, b) => a[0] - b[0])
    .forEach((r) => {
      let xi = xs.indexOf(r[0]);
      for (let i = xi; xs[i] < r[2]; ++i) splitedRecs[i].push([xs[i], r[1], xs[i + 1], r[3]]);
    });
  //Merge all rectangles (on the Y axis) that have the same minX (and maxX).
  //Calculate the area of each rectangle and sum them up.
  return splitedRecs.reduce((t, c) => {
    if (c.length === 0) return t;
    c = c.sort((a, b) => a[1] - b[1]);
    let mergedRecs = [c[0]];
    for (let i = 1, j = 0; i < c.length; ++i) {
      if (c[i][1] > mergedRecs[j][3]) {
        mergedRecs.push(c[i]);
        ++j;
      } else mergedRecs[j][3] = Math.max(c[i][3], mergedRecs[j][3]);
    }
    return t + mergedRecs.reduce((a, r) => a + (r[2] - r[0]) * (r[3] - r[1]), 0);
  }, 0);
}

// prettier-ignore
const testValues = [[[[0,0,1,1], [1,1,2,2]], 2], [[[0,0,1,1], [0,0,2,2]] , 4], [[[3,3,6,5],[4,4,6,6],[4,3,7,5],[4,2,8,5],[4,3,8,6],[9,0,11,4],[9,1,10,6],[9,0,12,2],[10,1,13,5],[12,4,15,6],[14,1,16,5],[12,1,17,2]], 52],[[[2, 2, 17, 2], [2, 2, 17, 4], [2, 2, 17, 6], [2, 2, 17, 8], [2, 2, 17, 10], [2, 2, 17, 12], [2, 2, 17, 14], [2, 2, 17, 16], [2, 2, 17, 18], [2, 2, 17, 20], [2, 2, 17, 22], [2, 2, 17, 24], [2, 2, 17, 26], [2, 2, 17, 28]], 390]];
const test = require('../utils/simpleTester.js');
let start = performance.now();
test(calculate2, testValues);
console.log('Time: ' + (performance.now() - start) + ' ms');

// split to unique rectangles
function calculate2(recs) {
  if (recs.length === 0) return 0;
  let xs = new Set(),
    ys = new Set();

  recs.forEach((r) => {
    xs.add(r[0]).add(r[2]);
    ys.add(r[1]).add(r[3]);
  });
  xs = Array.from(xs).sort((a, b) => a - b);
  ys = Array.from(ys).sort((a, b) => a - b);
  const areas = new Map();

  return recs
    .sort((a, b) => a[0] - b[0])
    .reduce((t, r) => {
      let yi = ys.indexOf(r[1]);
      for (let i = xs.indexOf(r[0]), j = yi; xs[i] < r[2]; j++) {
        const x = xs[i];
        const y = ys[j];
        if (y === r[3]) {
          j = yi - 1;
          ++i;
          continue;
        }
        const key = x + ',' + y;
        if (areas.has(key)) continue;
        const w = xs[i + 1] - x;
        const h = ys[j + 1] - y;
        areas.set(key, 1);
        t += w * h;
      }
      return t;
    }, 0);
}
