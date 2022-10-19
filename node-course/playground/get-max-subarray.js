const { log, logSuccess, logFailure } = require('./utils/logging');

log(getMaxSubSum([-1, 2, 3, -9]));
log(getMaxSubSum([2, -1, 2, 3, -9]));
log(getMaxSubSum([-1, 2, 3, -9, 11]));
log(getMaxSubSum([-2, -1, 1, 2]));
log(getMaxSubSum([100, -9, 2, -3, 5]));
log(getMaxSubSum([1, 2, 3]));

log(getMaxSubSum([-1, 2, 3, -9]) === 5);
log(getMaxSubSum([2, -1, 2, 3, -9]) === 6);
log(getMaxSubSum([-1, 2, 3, -9, 11]) === 11);
log(getMaxSubSum([-2, -1, 1, 2]) === 3);
log(getMaxSubSum([100, -9, 2, -3, 5]) === 100);
log(getMaxSubSum([1, 2, 3]) === 6);

function getMaxSubSum(numbersList) {
  while (numbersList[0] <= 0) {
    numbersList.shift();
  }
  let i = numbersList.length - 1;
  while (numbersList[i] <= 0) {
    numbersList.pop();
    i--;
  }
  return reduceArray(simplifyArray(numbersList), 0);
}

function reduceArray(numbers, maxSum) {
  if (numbers.length < 3) {
    return Math.max(maxSum, numbers[0]);
  }
  const initialValue = numbers[0];
  const nextSum = numbers[0] + numbers[1] + numbers[2];
  const reducer = numbers[1];
  const appender = numbers[2];
  if (initialValue <= 0) {
    numbers.shift();
    numbers.shift();
    return reduceArray(numbers, maxSum);
  }
  if (appender + reducer >= 0) {
    if (nextSum > appender) numbers = sumUpThreeEls(numbers, nextSum);
    else numbers = sumUpThreeEls(numbers, appender);
    return reduceArray(numbers, maxSum);
  }
  if (maxSum < initialValue) {
    maxSum = initialValue;
  }
  if (nextSum > appender) numbers = sumUpThreeEls(numbers, nextSum);
  else numbers = sumUpThreeEls(numbers, appender);
  return reduceArray(numbers, maxSum);
}

function simplifyArray(numbers) {
  const simplifiedArray = [];
  let isPositive = true;
  let accumulator = 0;
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] >= 0 !== isPositive) {
      simplifiedArray.push(accumulator);
      isPositive = !isPositive;
      accumulator = 0;
    }
    accumulator += numbers[i];
  }
  if (accumulator !== 0) simplifiedArray.push(accumulator);
  return simplifiedArray;
}

function sumUpThreeEls(numbers, sum) {
  numbers.shift();
  numbers.shift();
  numbers[0] = sum;
  return numbers;
}
