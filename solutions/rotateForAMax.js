//https://www.codewars.com/kata/56a4872cbb65f3a610000026

function maxRot(n) {
  n = n.toString();
  let res = +n;
  for (let i = 0; i < n.length; i++) {
    n = n.slice(0, i) + n.slice(i + 1) + n[i];
    res = Math.max(res, +n);
  }
  return res;
}

// Test Cases
const test = require('../utils/simpleTester.js'),
  testValues = [
    [56789, 68957],
    [38458215, 85821534],
    [195881031, 988103115],
    [896219342, 962193428],
    [69418307, 94183076],
    [886540207, 886540207],
    [678944142, 794468412],
  ];

test(maxRot_compact, testValues);
