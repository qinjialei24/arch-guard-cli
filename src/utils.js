const axios = require('axios');

module.exports = {
  toUpperCaseFirstWord(str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
  },

  getTemplatePage() {
    return axios.get('./template/Page.js');
  },
};
