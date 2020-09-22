const Metalsmith = require('metalsmith');
const Handlebars = require('handlebars');

module.exports = {
  toUpperCaseFirstWord(str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
  },
  generateFileByTemplate(template, data) {
    var content = Handlebars.compile(template)(data);
    return content;
  },
};
