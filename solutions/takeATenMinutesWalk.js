// https://www.codewars.com/kata/54da539698b8a2ad76000228

function isValidWalk(walk) {
  return walk.length === 10 && dirLength('w') == dirLength('e') && dirLength('n') == dirLength('s');
  function dirLength(dir) {
    return walk.filter((x) => x == dir).length;
  }
}
