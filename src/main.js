const program = require('commander');
const { version } = require('./constants');
const initCommandGenerate = require('./commands/generate');

function initCommand() {
  initCommandGenerate(program);

  program
    .on('--help', () => {
      console.log(`--help`);
    })
    .version(version)
    .parse(process.argv);
}

initCommand();
