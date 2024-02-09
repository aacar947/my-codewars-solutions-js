//https://www.codewars.com/kata/5679aa472b8f57fb8c000047

function findEvenIndex(arr) {
  if (arr.length === 1) return 0;
  let l = 0,
    r = arr.reduce((ac, v) => ac + v, 0),
    prev = 0,
    res = -1;
  for (let i = 0; i < arr.length; i++) {
    const v = arr[i];
    l += prev;
    r -= v;
    console.log({ l, r });
    if (l === r) {
      res = i;
      break;
    }
    prev = v;
  }
  return res;
}

// Test cases
// prettier-ignore
const test = require('../utils/simpleTester.js'), testValues = [
    [[1,2,3,4,3,2,1],3],[[1,100,50,-51,1,1],1],[[1,2,3,4,5,6],-1],[[20,10,30,10,10,15,35],3],[[8,0],0]
]

test(findEvenIndex, testValues);
