//https://www.codewars.com/kata/523f5d21c841566fde000009
function arrayDiff(a, b) {
  return a.filter((e) => !b.includes(e));
}
