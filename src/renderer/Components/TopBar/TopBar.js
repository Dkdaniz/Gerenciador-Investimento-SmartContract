const template = require('./TopBar.html').default;

require("./TopBar.scss");

module.exports = {
  template,
  bindings: {
    items: '<'
  },
  controllerAs: 'vm'
}