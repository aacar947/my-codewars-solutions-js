//https://www.codewars.com/kata/55f89832ac9a66518f000118
function simplify(poly) {
  const matches = poly.match(/([-+]?\d*[a-z]+)/g);
  return Object.entries(
    matches.reduce((ac, m) => {
      const name = m
          .match(/[a-z]+/)[0]
          .split('')
          .sort()
          .join(''),
        value = m.match(/[-+]?/)[0] + ((/\d+/.test(m) && m.match(/\d+/)[0]) || 1);
      ac[name] = ac[name] ? ac[name] + parseInt(value) : parseInt(value);
      return ac;
    }, {})
  )
    .filter(([_, v]) => v !== 0)
    .sort((a, b) => (a[0].length === b[0].length ? a[0].localeCompare(b[0], 'en') : a[0].length - b[0].length))
    .map(([k, v]) => `${v > 0 ? '+' + v : v}${k}`.replace(/(?<!\d)1(?!\d)/, ''))
    .join('')
    .replace(/^\+?/, '');
}

const test = require('../utils/simpleTester.js');
const testValues = {
  'a+3ab+2a-c-2a': 'a-c+3ab',
  'a+5ab+3a-c-2a': '2a-c+5ab',
  'dc+dcba': 'cd+abcd',
  '-a+5ab+3a-c-2a': '-c+5ab',
};

test(simplify, testValues);
