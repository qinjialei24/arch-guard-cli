const program = require('commander');
const { version } = require('./constants');

const COMMAND_CONFIG = {
  generate: {
    alias: 'g',
    description: 'generate a page/components/api',
    examples: ['xc generate <page-name>'], // page 名字首字母必须大写
  },
  config: {
    alias: 'conf',
    description: 'config project variable',
    examples: ['xc config set <K> <v> '],
  },
  '*': {
    alias: '',
    description: 'command not found',
    examples: [],
  },
};

Reflect.ownKeys(COMMAND_CONFIG).forEach((action) => {
  program
    .command(action)
    .alias(COMMAND_CONFIG[action].alias)
    .description(COMMAND_CONFIG[action].description)
    .action(() => {
      if (action === '*') {
        console.log(COMMAND_CONFIG[action].description);
      }
    });
});

program.version(version).parse(process.argv);
