const fs = require('fs');
const path = require('path');

function copyTemplateByName(fileName) {
  fileName = path.join(__dirname, 'templates', fileName);
  return fs.readFileSync(fileName, 'utf-8');
}

//   process.cwd() 当前执行程序的路径（执行命令行时候的路径,不是代码路径 例如 在根目录下执行 node ./xxx/xxx/a.js 则 cwd 返回的是 根目录地址 ）
// __dirname: 代码存放的位置
// process.execPath: 当前执行的node路径（如：/bin/node）
function generatePage() {
  const pageGeneratePath = path.join(process.cwd(), 'pages');
  console.log('pageGeneratePath: ', pageGeneratePath);
  const res = copyTemplateByName('page.js');
  fs.writeFileSync(pageGeneratePath, res);
}

module.exports = (actionName, fileName, ...option) => {
  console.log('actionName: ', actionName);
  if (actionName === 'page') {
    generatePage();
  }
  if (actionName === 'component') {
    // xc g component basic / business
  }

  console.log('actionName: ', actionName);
  console.log('option: ', option);
  console.log('fileName: ', fileName);
};
