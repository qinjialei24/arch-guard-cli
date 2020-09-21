const axios = require('axios');
const Metalsmith = require('metalsmith'); // 引入静态网站生成器
const Handlebars = require('handlebars'); // 引入模板引擎

module.exports = {
  toUpperCaseFirstWord(str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
  },

  generateFileByTemplate(template, data) {
    // compile the template
    var content = Handlebars.compile(template)(data);
    return content;
    // var template = Handlebars.compile('Handlebars <b>{{doesWhat}}</b>');
    // execute the compiled template and print the output to the console
  },
};
