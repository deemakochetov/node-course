const { log, logSuccess, logFailure } = require('./utils/logging');

log(camelize('background'));
log(camelize('list-style-image'));
log(camelize('-webkit-transition'));

log(camelize('background-color') === 'backgroundColor');
log(camelize('list-style-image') === 'listStyleImage');
log(camelize('-webkit-transition') === 'WebkitTransition');

function camelize(payload) {
  let words = payload.split('-');
  words = words.map((word, index) =>
    index !== 0 ? word[0].toUpperCase() + word.slice(1) : word
  );
  return words.join('');
}
