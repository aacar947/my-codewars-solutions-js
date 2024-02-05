// https://www.codewars.com/kata/58c8c723df10450b21000024

function central_pixels(image, color) {
  console.log(image, color);
  let res = [],
    P = 1,
    T = 0;
  const getNbrs = (x, y) => {
    const b = (x + 1) * image.width + y,
      l = y === 0 ? -1 : x * image.width + (y - 1),
      t = (x - 1) * image.width + y,
      r = y === image.width - 1 ? -1 : x * image.width + (y + 1);
    return [t, r, b, l];
  };
  const block = image.pixels.reduce(
    (ac, c, i) => {
      if (c !== color) return ac;
      T++;
      const x = Math.floor(i / image.width);
      const y = i % image.width;
      const edge = getNbrs(x, y).some((i) => image.pixels[i] !== color);
      ac[i] = 0;
      ac.c[0] += x;
      ac.c[1] += y;
      if (!edge) return ac;
      if (!ac.lr[x]) ac.lr[x] = [];
      if (!ac.tb[y]) ac.tb[y] = [];
      ac.lr[x].push(y);
      ac.tb[y].push(x);
      res.push(i);
      ac[i] = 1;
      return ac;
    },
    { c: [0, 0], lr: {}, tb: {} }
  );
  if (!Object.values(block).some((v) => !v)) return res;
  // prettier-ignore
  res = [];
  block.c = block.c.map((v) => Math.round(v / T));
  const visited = [],
    center = block.c[0] * image.width + block.c[1],
    next = [center];
  const getPOf = (x, y) => {
    const lr = block.lr[x]
      .filter((v, i, arr) => (v <= y && arr[i + 1] >= y) || (v >= y && arr[i - 1] <= y))
      .reduce((ac, v) => Math.min(Math.abs(y - v) + 1, ac), image.width);
    const tb = block.tb[y]
      .filter((v, i, arr) => (v < x && arr[i + 1] > x) || (v > x && arr[i - 1] < x))
      .reduce((ac, v) => Math.min(Math.abs(x - v) + 1, ac), image.height);
    return Math.min(lr, tb);
  };

  const pushNbrs = (x, y) => {
    getNbrs(x, y)
      .filter((v) => v !== -1)
      .forEach((nbr) => {
        if (visited.includes(nbr)) return;
        next.push(nbr);
      });
  };

  while (Object.values(block).some((v) => !v) && next.length) {
    const curr = next.shift();
    if (visited.includes(curr)) continue;
    visited.push(curr);
    // prettier-ignore
    const x = Math.floor(curr / image.width), y = curr % image.width;
    if (block[curr] === undefined) {
      pushNbrs(x, y);
      continue;
    }
    const p = getPOf(x, y);
    if (p < P) continue;
    if (p > P) res = [];
    P = Math.max(P, p);
    res.push(curr);
    console.log(res);
    block[curr] = p;
    pushNbrs(x, y);
  }
  return res;
}

// prettier-ignore
const pic = {
  pixels: [
    1, 1, 4, 4, 4, 4, 2, 2, 2, 2, 
    1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 
    1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 
    1, 1, 1, 1, 1, 3, 2, 2, 2, 2, 
    1, 1, 1, 1, 1, 3, 3, 3, 2, 2, 
    1, 1, 1, 1, 1, 1, 3, 3, 3, 3,
  ],
  width: 10,
  height: 6,
};

// prettier-ignore
const pic2 = {
  pixels: [
    1, 1, 4, 4, 4, 4, 2, 2, 2, 2, 
    1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 
    1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 
    1, 1, 3, 1, 1, 3, 2, 2, 2, 2, 
    1, 1, 1, 1, 1, 3, 3, 3, 2, 2, 
    1, 1, 1, 1, 1, 1, 3, 3, 3, 3,
  ],
  width: 10,
  height: 6,
};

const circle = {
  pixels: [
    1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2,
    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1,
    1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1,
  ],
  width: 10,
  height: 9,
};

const ushape = {
  pixels: [
    2, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1,
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
  ],
  width: 8,
  height: 7,
};

console.table(central_pixels(pic2, 1));
//console.table(central_pixels(pic, 2));
//console.table(central_pixels(pic, 3));
//console.table(central_pixels(pic, 4));
//console.table(central_pixels(circle, 2));
//console.table(central_pixels(ushape, 2));
