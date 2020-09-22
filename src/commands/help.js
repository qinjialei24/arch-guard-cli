function printCommand() {
  const command = [
    '注意事项：必须在项目的src目录下运行',
    '常用缩写：generate => g,  component => c , --basic => -ba,  --business => -bu',
    '常用命令：',
    ' 创建页面：xc g page Demo',
    ' 创建基础组件：xc g c -ba (xc generate component --basic)',
    ' 创建业务组件：xc g c -bu (xc generate component --business)',
  ];
  command.forEach((item) => console.log(item));
}

function initCommandList(program) {
  program
    .command('help')
    .description('列出常用命令')
    .action((options) => {
      printCommand();
      // console.log(`常用缩写：generate => g,  component => c , --basic => -ba,  --business => -bu,\n常用命令：
      // 创建页面：xc g page Demo\n  创建基础组件：xc g component --basic
      // `);
      // console.log(1111);
      // console.log(1111222);
    });
}

module.exports = initCommandList;
