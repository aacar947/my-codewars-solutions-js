// https://www.codewars.com/kata/53d40c1e2f13e331fc000c26

let res = [];
function fib(n) {
  if (n === 0) {
    res = [0n, 1n];
    return 0n;
  }
  fib(parseInt(n / 2));
  let a = res[0],
    b = res[1];
  // as F(2n) = F(n)[2F(n+1) – F(n)]
  const c = a * (2n * b - a);
  // as F(2n + 1) = F(n)^2 + F(n+1)^2
  const d = a * a + b * b;
  res = n % 2 === 0 ? [c, d] : [d, c + d];
  return n < 0 && n % 2 === 0 ? -res[0] : res[0];
}

// TEST CASES
const test = require('../utils/simpleTester.js');

const testValues = [
  [-99, 218922995834555169026n],
  [-26, -121393n],
  [0, 0n],
  [1, 1n],
  [2, 1n],
  [500, 139423224561697880139724382870407283950070256587697307264108962948325571622863290691557658876222521294125n],
];
test(fib, testValues);
