const fs = require('fs');
const path = require('path');
const { toUpperCaseFirstWord } = require('./utils');

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
    console.log(from);
    write(to, fs.readFileSync(from, 'utf-8'));
  }
  function write(path, str, mode) {
    fs.writeFileSync(path, str);
  }
  // 新建目录
  function mkdir(path, fn) {
    fs.mkdir(path, function (err) {
      fn && fn();
    });
  }

  var PATH = './pages';
  mkdir(PATH + `/${fileName}`, function () {
    copyTemplate('page.js', PATH + `/${fileName}/${fileName}.tsx`);
  });

  // mkdir(PATH + `/pages`, function () {
  //   mkdir(PATH + `/${fileName}/js`, function () {
  //     copyTemplate('page.js', PATH + `/${fileName}/js/vue.min.js`);
  //   });
  // });

  // mkdir(pageGeneratePath + '/public', function () {
  //   mkdir(PATH + '/public/js', function () {
  //     const pageGeneratePath = path.join(process.cwd(), 'pages');
  //     console.log('pageGeneratePath: ', pageGeneratePath);
  //     const res = copyTemplateByName('page.js');
  //     fs.writeFileSync(path, str)
  //     console.log('res: ', res);
  //     copyTemplate('/js/vue.min.js', PATH + '/public/js/vue.min.js');
  //   });
  // });

  // fs.writeFileSync(pageGeneratePath, res);
}

module.exports = (actionName, fileName, ...option) => {
  console.log('actionName: ', actionName);
  if (actionName === 'page') {
    generatePage(fileName);
  }
  if (actionName === 'component') {
    // xc g component basic / business
  }

  console.log('actionName: ', actionName);
  console.log('option: ', option);
  console.log('fileName: ', fileName);
};
