const Handlebars = require('handlebars');

module.exports = {
  toUpperCaseFirstWord(str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
  },
  generateFileByTemplate(template, data) {
    var content = Handlebars.compile(template)(data);
    return content;
  },
};
