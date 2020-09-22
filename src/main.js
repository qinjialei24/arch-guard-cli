const program = require('commander');
const { version } = require('./constants');
const initCommandGenerate = require('./commands/generate');
const initCommandList = require('./commands/list');

function initCommand() {
  initCommandGenerate(program);
  initCommandList(program);

  program
    .on('--help', () => {
      console.log(`--help`);
    })
    .version(version)
    .parse(process.argv);
}

initCommand();
