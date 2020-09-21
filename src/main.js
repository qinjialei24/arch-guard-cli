const program = require('commander');
const path = require('path');
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
      } else {
        const location = path.resolve(__dirname, `./commands/${action}.js`);
        const generator = require(location);//根据action， 动态在 commands 文件夹下查找对应的执行文件
        generator(...process.argv.slice(3));
      }
    });
});

program.on('--help', () => {
  console.log('\nExamples:');
  Reflect.ownKeys(COMMAND_CONFIG).forEach((action) => {
    COMMAND_CONFIG[action].examples.forEach((examples) => {
      console.log(`${examples}`);
    });
  });
});

program.version(version).parse(process.argv);
