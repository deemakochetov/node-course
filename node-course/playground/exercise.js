const { log, logSuccess, logFailure } = require('./utils/logging');

const generator = pseudoRandom(1);

log(generator.next().value); // 16807
log(generator.next().value); // 282475249
log(generator.next().value); // 1622650073

function* pseudoRandom(seed) {
  let number = seed;
  while (true) {
    number = multiply(number);
    yield number;
  }
}

function multiply(num) {
  return (num * 16807) % 2147483647;
}
