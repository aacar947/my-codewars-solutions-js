//https://www.codewars.com/kata/52cf02cd825aef67070008fa/train/javascript

device.decode = function (w) {
  let dict = 'bdhpF,82QsLirJejtNmzZKgnB3SwTyXG ?.6YIcflxVC5WE94UA1OoD70MkvRuPqHa';
  return w
    .split('')
    .map((c, i) => {
      if (dict.indexOf(c) === -1) return c;
      const index = (dict.indexOf(c) + dict.length - i - 1) % dict.length;
      return dict[index];
    })
    .join('');
};
