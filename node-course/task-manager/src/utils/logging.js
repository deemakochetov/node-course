const chalk = require('chalk');

const logSuccess = (message) => {
  console.log(chalk.green(message));
};

const logFailure = (message) => {
  console.log(chalk.red(message));
};

const logNeutral = (message) => {
  console.log(message);
};

module.exports = { logFailure, logSuccess, logNeutral };
