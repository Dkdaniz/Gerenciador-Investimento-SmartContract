const { copyTextToClipboard } = require('../../../Utils/Utils');
const template = require('./ListContracts.html').default;

function Controller(ContractRepository) {
  const vm = this;

  vm.$onInit = init;
  vm.contracts = [];
  vm.processing = false;
  vm.error = null;
  vm.openOptions = openOptions;
  vm.getData = getData;
  vm.copy = copy;

  function init() {
    getData();
  }

  function getData() {
    vm.processing = true;
    vm.error = false;
    ContractRepository.all()
      .then(contracts => {
        vm.contracts = contracts;
        vm.processing = false;
      })
      .catch(err => {
        vm.error = err;
        console.error(err);
        vm.processing = false;
      })
      
  }

  function openOptions(contract) {
    vm.contracts.forEach(c => c.optionsActive = true);
    contract.optionsActive = false;
  }

  function copy(str) {
    copyTextToClipboard(str);
  }
}

module.exports = {
  template,
  controllerAs: 'vm',
  controller: ['ContractRepository', Controller],
};
