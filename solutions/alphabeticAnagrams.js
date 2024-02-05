// https://www.codewars.com/kata/53e57dada0cb0400ba000688/train/javascript

const fact = (n) => (n < 2 ? 1 : n * fact(n - 1));
const getPOf = (arr) => {
  return Object.values(
    arr.reduce((ac, c) => {
      ac[c] = (ac[c] || 0) + 1;
      return ac;
    }, {})
  ).reduce((ac, v) => ac / fact(v), fact(arr.length));
};
function listPosition(word) {
  return word.split('').reduce((ac, curr, i, arr) => {
    const visited = [];
    arr.slice(i + 1).forEach((next, j, rest) => {
      if (next >= curr || visited[next]) return;
      ac += getPOf([curr, ...rest.slice(0, j), ...rest.slice(j + 1)]);
      visited[next] = 1;
    });
    return ac;
  }, 1);
}

const test = require('../utils/simpleTester.js');
const testValues = { A: 1, ABAB: 2, AAAB: 1, BAAA: 4, QUESTION: 24572, BOOKKEEPER: 10743 };

test(listPosition, testValues);
