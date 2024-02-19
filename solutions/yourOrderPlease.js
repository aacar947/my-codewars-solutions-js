// https://www.codewars.com/kata/55c45be3b2079eccff00010f
// Your order, please

const order = (w) =>
  w
    .split(' ')
    .sort((a, b) => a.match(/\d/) - b.match(/\d/))
    .join(' ');

// Test Cases
const test = require('../utils/simpleTester.js'),
  testValues = {
    'is2 Thi1s T4est 3a': 'Thi1s is2 3a T4est',
    '4of Fo1r pe6ople g3ood th5e the2': 'Fo1r the2 g3ood 4of th5e pe6ople',
    '': '',
  };
test(order, testValues);
