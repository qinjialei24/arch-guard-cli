const fs = require('fs');
const path = require('path');

const {toUpperCaseFirstWord, generateFileByTemplate} = require('../utils');

const FILE_PATH = {
    pagesPath: './pages', //页面存放的路径 TODO: 处理首字母大小写
    componentsPath: './components', //组件存放的路径，TODO: 处理首字母大小写
};

const ACTION_NAME = 'page';

function copyTemplate(from, to, fileName, componentName) {
    from = path.join(__dirname, '../templates', from);
    const rawContent = fs.readFileSync(from, 'utf-8');
    const finalContent = generateFileByTemplate(rawContent, {
        fileName,
        componentName
    });
    write(to, finalContent);
}

function write(path, str, mode) {
    fs.writeFileSync(path, str);
}

function generatePage(fileName) {
    fileName = toUpperCaseFirstWord(fileName);
    fs.mkdirSync(FILE_PATH.pagesPath + `/${fileName}`);
    copyTemplate(
        ACTION_NAME,
        FILE_PATH.pagesPath + `/${fileName}/${fileName}.tsx`,
        fileName
    );
    copyTemplate(
        ACTION_NAME + 'Less',
        FILE_PATH.pagesPath + `/${fileName}/${fileName}.less`,
        fileName
    );
    fs.mkdirSync(FILE_PATH.pagesPath + `/${fileName}` + '/components');
}

function generateComponent(fileName, componentOptions) {
    console.log("-> fileName", fileName);
    const {basic, business} = componentOptions;
    console.log("-> basic", basic);
    generateComponentBasic(fileName)

    // if (basic) {
    //   generateComponentBasic(fileName);
    // } else if (business) {
    //   generateComponentBusiness(fileName);
    // }
}

function generateComponentBasic(fileName) {
    console.log("-> fileName", fileName);
    // fs.mkdirSync(FILE_PATH.componentsPath  + `/${fileName}`);
    fs.mkdirSync(fileName)
    const componentName = toUpperCaseFirstWord(fileName)

    copyTemplate(
        `componentBasic`,
        `${fileName}/${componentName}.tsx`,
        fileName,
        componentName
    );
    //
    // copyTemplate(
    //   'componentBasicLess',
    //   FILE_PATH.componentsPath + `/${fileName}/${fileName}.less`,
    //   fileName
    // );
}

function generateComponentBusiness(fileName) {
    fileName = toUpperCaseFirstWord(fileName);
    fs.mkdirSync(FILE_PATH.componentsPath + '/Business' + `/${fileName}`);
    copyTemplate(
        `componentBusiness`,
        FILE_PATH.componentsPath + '/Business' + `/${fileName}/${fileName}.tsx`,
        fileName
    );

    copyTemplate(
        'componentBusinessLess',
        FILE_PATH.componentsPath + '/Business' + `/${fileName}/${fileName}.less`,
        fileName
    );
}

function generate(options, actionName, fileName) {
    console.log("-> process.cwd()", process.cwd());
    // if (!process.cwd().endsWith('/src')) {
    //   console.error('请在项目的 src 目录下运行！');
    //   return;
    // }
    // if (actionName === ACTION_NAME) {
    //   if (fileName.includes('-')) {
    //     console.error('pages下文件必须以首字母大写+驼峰命名！');
    //     return;
    //   }
    //   //TODO:检查文件名是否重复
    //   generatePage(fileName);
    // }
    if (actionName === 'component' || 'c') {
        // ag g component basic / business
        generateComponent(fileName, options);
    }
}

function initCommandGenerate(program) {
    program
        .command('generate')
        .alias('g')
        .description('generate a page/components/api')
        .option('-ba, --basic', '创建 basic components')
        .option('-bu, --business', '创建 business components')
        .action((options) => {
            generate(options, ...process.argv.slice(3)); // ag g component
        });
}

module.exports = initCommandGenerate;
