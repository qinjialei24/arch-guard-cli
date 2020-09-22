const program = require('commander');
const { version } = require('./constants');
const initCommandGenerate = require('./commands/generate');
const initCommandHelp = require('./commands/Help');

function initCommand() {
  initCommandGenerate(program);
  initCommandHelp(program);

  program
    .on('--help', () => {
      console.log(`--help`);
    })
    .version(version)
    .parse(process.argv);
}

initCommand();
