function expand(expr) {
  let a = expr.match(/(?<!\^)[+-?]\d*(?=[a-z])/g) || [1],
    res = [];
  const x = expr.match(/([a-z]{1})/g)[0];
  let b = expr.match(/(?<=[a-z])[-+]?\d+(?![a-z])/g) || [0];
  let n = expr.match(/\^([0-9]+)/g)[0].replace(/\^/, '');
  n = +n;
  for (let i = 0; i <= n; i++) {
    res[i] = binominal(n, i, a[0] === '-' ? -1 : +a[0], +b[0]);
  }
  return n === 0
    ? '1'
    : res
        .map((r, i) => {
          const _n = n - i;
          if (r === 0) return '';
          if (r > 0 && i > 0) r = '+' + r;
          if (i === 0) r = r === 1 ? '' : r === -1 ? '-' : r;
          return _n === 0 ? r : _n === 1 ? r + x : r + x + '^' + _n;
        })
        .join('');
}
function binominal(n, k, a, b) {
  return (factorial(n) / (factorial(k) * factorial(n - k))) * Math.pow(b, k) * Math.pow(a, n - k);
}
function factorial(n) {
  let res = 1;
  for (let i = 1; i <= n; i++) {
    res *= i;
  }
  return res;
}

// TEST CASES

const test = require('../utils/simpleTester.js');

const testValues = {
  '(x+1)^0': '1',
  '(x+1)^1': 'x+1',
  '(x+1)^2': 'x^2+2x+1',
  '(5m+3)^4': '625m^4+1500m^3+1350m^2+540m+81',
  '(2x-3)^3': '8x^3-36x^2+54x-27',
  '(-5m+3)^4': '625m^4-1500m^3+1350m^2-540m+81',
  '(-2k-3)^3': '-8k^3-36k^2-54k-27',
  '(45x-6)^5': '184528125x^5-123018750x^4+32805000x^3-4374000x^2+291600x-7776',
  '(-n-12)^5': '-n^5-60n^4-1440n^3-17280n^2-103680n-248832',
};

test(expand, testValues);
