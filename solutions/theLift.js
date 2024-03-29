// https://www.codewars.com/kata/58905bfa1decb981da00009e
function theLift(queues, capacity) {
  let dir = 1,
    visited = [0],
    lift = [],
    hasCall = true;
  while (hasCall) {
    for (let f = dir < 0 ? queues.length - 1 : 0; f * dir < queues.length * (dir > 0 ? 1 : 0); f += dir) {
      const q = queues[f];
      if (!lift.some((v) => v === f) && !q.some((v) => (dir < 0 ? v - f < 0 : v - f > 0))) continue;
      // get people off the lift
      lift = lift.filter((v) => v !== f);
      if (visited[visited.length - 1] !== f) visited.push(f);
      if (lift.length === capacity) continue;
      // get people on the lift
      q.filter((v) => (dir < 0 ? v - f < 0 : v - f > 0)).forEach((v) => {
        if (lift.length === capacity) return;
        lift.push(v);
        // delete from queue
        q.splice(q.indexOf(v), 1);
      });
    }
    hasCall = queues.some((q) => q.length > 0) || lift.length > 0;
    if (!hasCall && visited[visited.length - 1] !== 0) visited.push(0);
    dir = -dir;
  }
  return visited;
}

// prettier-ignore

const q1 = [[], [], [4, 4, 4, 4], [], [2, 2, 2, 2], [], []]

const q2 = [
  [], // G
  [3], // 1
  [4], // 2
  [], // 3
  [5], // 4
  [], // 5
  [], // 6
];

const q3 = [
  [], // G
  [0], // 1
  [], // 2
  [], // 3
  [2], // 4
  [3], // 5
  [], // 6
];

const testValues = [
  [
    [q1, 2],
    [+0, 2, 4, 2, 4, 2, +0],
  ],
  [
    [q2, 5],
    [0, 1, 2, 3, 4, 5, 0],
  ],
  [
    [q3, 5],
    [0, 5, 4, 3, 2, 1, 0],
  ],
];
const test = require('../utils/simpleTester.js');

test(
  (args) => {
    return theLift(...args);
  },
  testValues,
  { tester: (a, b) => a.toString() === b.toString() }
);
