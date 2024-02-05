//https://www.codewars.com/kata/55dcdd2c5a73bdddcb000044

function calculate(recs) {
  const units = recs.reduce((ac, [x1, y1, x2, y2]) => {
    if (ac.hasOwnProperty(x1 + ',' + y1) && ac.hasOwnProperty(x2 + ',' + y2)) return ac;
    for (let x = x1; x < x2; x++) {
      for (let y = y1; y < y2; y++) {
        ac[x + ',' + y] = 1;
      }
    }

    return ac;
  }, {});
  console.log(units);
  return Object.values(units).length;
}

// prettier-ignore
const testValues = [[[[0,0,1,1], [1,1,2,2]], 2], [[[0,0,1,1], [0,0,2,2]] , 4], [[[3,3,6,5],[4,4,6,6],[4,3,7,5],[4,2,8,5],[4,3,8,6],[9,0,11,4],[9,1,10,6],[9,0,12,2],[10,1,13,5],[12,4,15,6],[14,1,16,5],[12,1,17,2]], 52]];
const test = require('../utils/simpleTester.js');

test(calculate, testValues);
