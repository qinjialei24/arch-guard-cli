const Metalsmith = require('metalsmith'); // 引入静态网站生成器
const Handlebars = require('handlebars'); // 引入模板引擎

module.exports = {
  toUpperCaseFirstWord(str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
  },
  generateFileByTemplate(template, data) {
    var content = Handlebars.compile(template)(data);
    return content;
  },
};
