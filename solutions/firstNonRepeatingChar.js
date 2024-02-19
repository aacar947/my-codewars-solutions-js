// First non-repeating character
//https://www.codewars.com/kata/52bc74d4ac05d0945d00054e

function firstNonRepeatingLetter(s) {
  return (
    s
      .split('')
      .filter((v) => s.toLowerCase().indexOf(v.toLowerCase()) === s.toLowerCase().lastIndexOf(v.toLowerCase()))[0] || ''
  );
}

// Test Cases
const test = require('../utils/simpleTester.js'),
  testValues = {
    a: 'a',
    stress: 't',
    moonmen: 'e',
    sTreSS: 'T',
    abba: '',
    "Go hang a salami, I'm a lasagna hog!": ',',
  };
test(firstNonRepeatingLetter, testValues);
