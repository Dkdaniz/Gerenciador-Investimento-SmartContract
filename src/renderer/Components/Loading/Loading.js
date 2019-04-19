require("./Loading.scss");

module.exports = {
  template: `<div ng-if="vm.show" id="loading-backdrop"><div class="spinner"></div></div>`,
  bindings: {
    show: '='
  },
  controllerAs: 'vm'
}