/* eslint-disable prettier/prettier */
const yargs = require('yargs');

// Create add command
yargs.command({
  command: 'add',
  describe: 'Adds new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Note content',
      demandOption: true,
      type: 'string'
    },
  },
  // eslint-disable-next-line func-names, object-shorthand
  handler: (argv) => {
    console.log(`${argv.title} : ${argv.body}`);
  }
});

// Create remove command
yargs.command({
  command: 'remove',
  describe: 'Removes note',
  // eslint-disable-next-line func-names, object-shorthand
  handler: () => {
    console.log('Adding new message');
  }
});

// Create list command
yargs.command({
  command: 'list',
  describe: 'Lists all notes',
  // eslint-disable-next-line func-names, object-shorthand
  handler: () => {
    console.log('Adding new message');
  }
});

// Create read command
yargs.command({
  command: 'read',
  describe: 'Reads note',
  // eslint-disable-next-line func-names, object-shorthand
  handler: () => {
    console.log('Adding new message');
  }
});
console.log(yargs.argv)