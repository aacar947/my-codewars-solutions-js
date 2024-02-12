// The latest clock
// https://www.codewars.com/kata/58925dcb71f43f30cd00005f

const valid = (t) => t.slice(0, 2) < 24 && t.slice(-2) < 60;
// generate all possible permutations
const perm = (k, arr) => {
  if (k === 1) return arr.map((a) => [a]);
  const res = [];
  arr.forEach((a, i) => {
    const perms = perm(k - 1, arr.slice(0, i).concat(arr.slice(i + 1)));
    perms.forEach((p) => res.push([a, ...p]));
  });
  return res;
};
function latestClock(...args) {
  return perm(args.length, args)
    .filter((v) => valid(v.join('')))
    .reduce(
      (a, v) => (a.split(':').join('') > v.join('') ? a : v.slice(0, 2).join('') + ':' + v.slice(2, 4).join('')),
      '00:00'
    );
}

// Tests
const test = require('../utils/simpleTester.js'),
  testValues = [
    [[1, 9, 8, 3], '19:38'],
    [[9, 1, 2, 5], '21:59'],
    [[1, 2, 8, 9], '19:28'],
    [[0, 0, 0, 0], '00:00'],
    [[2, 4, 0, 0], '20:40'],
  ];
test((args) => latestClock(...args), testValues);
