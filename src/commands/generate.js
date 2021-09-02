const fs = require('fs');
const path = require('path');

const {toUpperCaseFirstWord, generateFileByTemplate} = require('../utils');

function copyTemplate(from, to, fileName, componentName) {
    from = path.join(__dirname, '../templates', from);
    const rawContent = fs.readFileSync(from, 'utf-8');
    const finalContent = generateFileByTemplate(rawContent, {
        fileName,
        componentName
    });
    fs.writeFileSync(to, finalContent);
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
    generateComponentBasic(fileName)
}

function initCommandGenerate(program) {
    program
        .command('generate')
        .alias('g')
        .action((options) => {
            generate(options, ...process.argv.slice(2));
        });
}

module.exports = initCommandGenerate;
