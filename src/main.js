const program = require('commander');
const { version } = require('./constants');

program.version(version).parse(process.argv);
