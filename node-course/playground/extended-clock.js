const Clock = require('./exercise');

class ExtendedClass extends Clock {
  constructor(options) {
    super(options);
    const { precision = 1000 } = options;
    this.precision = precision;
  }

  start() {
    this.render();
    this.timer = setInterval(() => this.render(), this.precision);
  }
}

const extendedClock = new ExtendedClass({
  template: 'h:m:s',
  precision: 100
});

extendedClock.start();
