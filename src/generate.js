const fs = require('fs');
const path = require('path');
const { toUpperCaseFirstWord, generateFileByTemplate } = require('./utils');

function copyTemplateByName(fileName) {
  fileName = path.join(__dirname, 'templates', fileName);
  return fs.readFileSync(fileName, 'utf-8');
}

// 新建目录
function mkdir(path, fn) {
  fs.mkdir(path, function (err) {
    fn && fn();
  });
}

//   process.cwd() 当前执行程序的路径（执行命令行时候的路径,不是代码路径 例如 在根目录下执行 node ./xxx/xxx/a.js 则 cwd 返回的是 根目录地址 ）
// __dirname: 代码存放的位置
// process.execPath: 当前执行的node路径（如：/bin/node）
function generatePage(fileName) {
  fileName = toUpperCaseFirstWord(fileName);
  function copyTemplate(from, to) {
    from = path.join(__dirname, 'templates', from);
    const rawContent = fs.readFileSync(from, 'utf-8');
    const finalContent = generateFileByTemplate(rawContent, {
      fileName,
    });
    write(to, finalContent);
  }
  function write(path, str, mode) {
    fs.writeFileSync(path, str);
  }
  // 新建目录
  function mkdir(path, fn) {
    fs.mkdir(path, function (err) {
      console.error('请在项目的 src 目录下运行！');
      return;
      fn && fn();
    });
  }

  var PATH = './pages';
  mkdir(PATH + `/${fileName}`, function () {
    copyTemplate('page', PATH + `/${fileName}/${fileName}.tsx`);
  });
}

module.exports = (actionName, fileName, ...option) => {
  if (actionName === 'page') {
    generatePage(fileName);
  }
  if (actionName === 'component') {
    // xc g component basic / business
  }
};
