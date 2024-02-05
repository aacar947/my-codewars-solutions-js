const chalk = require('chalk');
const chalkTable = require('../utils/chalk-table.js');
const tableOptions = {
  leftPad: 2,
  columns: [
    { field: 'index', name: 'Index' },
    { field: 'asserted', name: chalk.magenta('Asserted') },
    { field: 'returned', name: chalk.cyan('Returned') },
    { field: 'expected', name: chalk.yellow('Expected') },
    { field: 'status', name: chalk.blueBright('Status') },
  ],
};

const MAX_W = 20;

module.exports = function test(callBack, inputs, options = {}) {
  if (!options.tester) {
    options.tester = (a, b) => a === b;
  }

  const entries = Array.isArray(inputs) ? inputs : Object.entries(inputs);
  const results = {};
  entries.forEach(([asserted, expected], i) => {
    let returned = callBack(asserted);
    const status = options.tester(returned, expected);
    const res = { index: i, asserted, returned, expected, status };

    if (options.logDetails) {
      console.log(res);
    }

    res.asserted = toRestirictedString(asserted, MAX_W);
    res.returned = toRestirictedString(returned, MAX_W);
    res.expected = toRestirictedString(expected, MAX_W);
    res.status = status ? chalk.bgGreen(chalk.white('   \u2713   ')) : chalk.white(chalk.bgRed('   \u2715   '));
    results[i] = res;
  });
  console.log(chalkTable(tableOptions, Object.values(results)));
};

function toRestirictedString(value, maxW = 20) {
  const type = typeof value;
  const wrap = {
    string: (v) => `'${v}'`,
    object: (v) =>
      Array.isArray(value)
        ? `${v + (v.includes('...') ? ']' : '')}(${value.length})`
        : `${v + (v.includes('...') ? '}' : '')}(${Object.keys(value).length})`,
  };
  let res = type === 'object' ? JSON.stringify(value) : value;
  if (typeof res === 'string' && res.length > maxW + 3) {
    res = res.slice(0, maxW) + '...';
  }
  res = wrap[type] ? wrap[type](res) : res;
  return useChalkBasedOnType(type, res);
}

function useChalkBasedOnType(type, value) {
  const colors = {
    number: chalk.cyanBright,
    string: chalk.yellow,
    object: chalk.cyan,
    boolean: chalk.magentaBright,
  };
  return colors[type] ? colors[type](value) : value;
}
