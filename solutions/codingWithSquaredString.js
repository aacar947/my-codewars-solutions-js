// Coding with Squared Strings
// https://www.codewars.com/kata/56fcc393c5957c666900024d

function code(t) {
  if (!t) return '';
  const n = Math.ceil(Math.sqrt(t.length));
  let s = '';
  t = t + '\v'.repeat(n * n - t.length);
  for (let i = n; i < n * n + 1; i += n) {
    s += t.slice(i - n, i) + (i === n * n ? '' : '\n');
  }
  return new Array(n)
    .fill('')
    .map((_, i) =>
      s
        .split('\n')
        .reduce((a, r) => [...a, r[i]], [])
        .reverse()
        .join('')
    )
    .join('\n');
}

function decode(s) {
  if (!s) return '';
  const n = Math.ceil(Math.sqrt(s.length));
  return new Array(n)
    .fill('')
    .map((_, i) => {
      return s
        .split('\n')
        .reduce((a, r) => [...a, r[n - i - 1]], [])
        .join('');
    })
    .join('')
    .replace(/\v/g, '');
}

// Tests
const data1 =
  'What do you remember? When I looked at his streaky glasses, I wanted ' +
  'to leave him. And before that? He stole those cherries for me at midnight. We were walking ' +
  'in the rain and I loved him. And before that? I saw him coming ' +
  'toward me that time at the picnic, edgy, foreign.';

const data2 =
  "Some say the world will end in fire, Some say in ice. From what I've tasted of desire " +
  'I hold with those who favor fire. But if it had to perish twice, I think I know enough of hate' +
  ' To say that for destruction ice Is also great And would suffice.';

const data1Sol =
  '\vctg?.nadr d gdbW\n\v,i    lnis tl eh\n\v mtIAakietboaara\n\veeo nnigsoe st?t\n\vd wsddnh lfls   \n\vgaaa  gtfeoeehWd\n' +
  '\vytrwbI .o rasiho\n\v, d e i rtev,se \n\v t hflnW h e  ny\n\vfhmioo emot Is o\n\voeemrvt eshh tIu\n\vr   eehw eaiwr  \n' +
  '\veptc deea tmaelr\n\viihot  rtc?.naoe\n\vgcamhhre h  tkom\n\vnntiaia meHAeyke\n\v.i ntmiwirend em';

const data2Sol =
  "fa  h ttrheI ilS\nitifakw   s'irdo\nc cotnihftivce m\neAereocaihree,we\n.n   wedroe . i \n\vdIdT , es t Sls\n\v seoe t.eIaFola\n" +
  '\vw s nIo   srm y\n\voatso  Bwhtoee \n\vulrautpuhoem nt\n\vlsuyghetold sdh\n\vdoc hir  d wa e\n\v  tt niif ohyi \n\vsgihoksfawfa nw\n' +
  '\vuroaf h vi ti o\n\vfent I iotd nfr';

const test = require('../utils/simpleTester.js'),
  testCode = [
    [data1, data1Sol],
    [data2, data2Sol],
    ['', ''],
  ],
  testDecode = [
    [data1Sol, data1],
    [data2Sol, data2],
    ['', ''],
  ];

test(code, testCode, { logPerformance: true });
test(decode, testDecode, { logPerformance: true });
