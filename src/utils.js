const axios = require('axios');

module.exports = {
  getTemplatePage() {
    return axios.get('./template/Page.js');
  },
};
