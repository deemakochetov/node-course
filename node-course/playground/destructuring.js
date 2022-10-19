const topSalary = (salaries) => {
  let winner = null;
  let min = 0;
  Object.entries(salaries).forEach(([person, salary]) => {
    if (salary > min) {
      winner = person;
      min = salary;
    }
  });
  return winner;
};

const salaries = {
  John: 100,
  Pete: 300,
  Mary: 250
};

console.log(topSalary(salaries));
console.log(topSalary({}));

const d = ['s', 'f'];
for (const n of d) {
  console.log(n);
}
