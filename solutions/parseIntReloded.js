//https://www.codewars.com/kata/525c7c5ab6aecef16e0001a5
function parseInt(string) {
  // prettier-ignore
  const nums = {zer:0,one: 1, two: 2, twe:2, thr: 3, thi: 3, fou: 4, for:4, fiv: 5, fif: 5, six: 6, sev: 7, eig: 8, nin: 9,ten: 10, ele: 11};
  const fact = { tho: 1000, mil: 1_000_000 };
  let _t = 0;
  return string
    .replaceAll('-', ' ')
    .replaceAll(/\sand/g, '')
    .split(' ')
    .reduce((t, n, i, arr) => {
      const key = n.slice(0, 3);
      if (key === 'hun') {
        _t *= 100;
      }
      if (Object.keys(fact).includes(key)) {
        t = _t * fact[key];
        _t = 0;
      }
      _t += n.includes('ty')
        ? nums[key] * 10
        : n.includes('lve') || n.includes('een')
        ? nums[key] + 10
        : nums[key] || 0;
      if (i === arr.length - 1) t += _t;
      return t;
    }, 0);
}

// Test cases
const test = require('../utils/simpleTester.js'),
  testValues = {
    one: 1,
    twenty: 20,
    'two hundred forty-six': 246,
    'one million': 1000000,
    'one thousand three hundred and fifty': 1350,
    'two thousand and fifty-three': 2053,
    'one hundred twenty-three thousand four hundred and twelve': 123412,
  };
test(parseInt, testValues);
