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


}

function generateComponentBasic(fileName) {
    const componentName = toUpperCaseFirstWord(fileName)

    fs.mkdirSync(fileName)
    fs.mkdirSync(`${fileName}/components`)


    copyTemplate(
        `componentBasic`,
        `${fileName}/${componentName}.tsx`,
        fileName,
        componentName
    );

    copyTemplate(
      'componentBasicStyle',
       `${fileName}/${componentName}.style.ts`,
      fileName
    );

    copyTemplate(
      'componentSpec',
       `${fileName}/${componentName}.spec.ts`,
        '',
        componentName
    );
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
    console.log("-> fileName", fileName);
    console.log("-> actionName", actionName);
    console.log("-> process.cwd()", process.cwd());
    generateComponent(fileName, options);

}

function initCommandGenerate(program) {
    program
        .command('generate')
        .alias('g')
        .action((options) => {
            generate(options, ...process.argv.slice(2)); // ag g component
        });
}

module.exports = initCommandGenerate;
