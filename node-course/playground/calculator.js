const { log, logSuccess, logFailure } = require('./utils/logging');

const calc = new Calculator();

logSuccess(calc.calculate('3 + 7'));

const powerCalc = new Calculator();
powerCalc.addMethod('*', (a, b) => a * b);
powerCalc.addMethod('/', (a, b) => a / b);
powerCalc.addMethod('**', (a, b) => a ** b);

const result = powerCalc.calculate('3 ** 3');
log(result); // 8

function Calculator() {
  this.calculate = function (str) {
    const [firstNum, operator, secondNum] = str.split(' ');
    if (operator in this.operations)
      return this.operations[operator](+firstNum, +secondNum);
    return 'No such operation';
  };
  this.addMethod = function (funcName, func) {
    this.operations[funcName] = func;
  };
  this.operations = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b
  };
}
