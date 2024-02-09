// https://www.codewars.com/kata/56648a2e2c464b8c030000bf

function markSpot(n) {
  if (n % 2 === 0 || typeof n !== 'number' || n < 0) return '?';
  const res = new Array(Math.ceil(n / 2)).fill(0).map((_, i, arr) => {
    const l = ' '.repeat(i * 2) + 'X';
    if (i === arr.length - 1) return l;
    const r = ' '.repeat(n * 2 - 3 - i * 4) + 'X';
    return l + r;
  });
  return [...res, ...res.reverse().slice(1)].join('\n') + '\n';
}
console.log(markSpot(1));
console.log(markSpot(5));
console.log(markSpot(7));
console.log(markSpot(9));
console.log(markSpot(27));
console.log(markSpot(45));
