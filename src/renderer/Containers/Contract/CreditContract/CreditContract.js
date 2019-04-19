const template = require('./CreditContract.html').default;

function Controller(ContractService, $stateParams, ContractRepository, $scope) {
  var vm = this;

  vm.$onInit = init;
  vm.contract = {};
  vm.processing = false;
  vm.credit = credit;
  vm.error = null;
  vm.success = null;

  function init() {
    findContract();
  }

  function findContract() {
    const { id } = $stateParams;
    ContractRepository.find(id)
      .then(contract => {
        vm.contract.address = contract.address;
      })
      .catch(console.error);
  }

  function credit() {
    vm.error = null;
    try {
      validate();
      creditContract();
    } catch (e) {
      onError(e);
    }
  }

  function creditContract() {
    vm.processing = true;
    ContractService.credit(vm.contract)
      .then(result => $scope.$apply(onSuccess.bind(null, result)))
      .catch(err => $scope.$apply(onError.bind(null, err)));
  }

  function onSuccess(res) {
    vm.success = "<b>Contrato</b> creditado com sucesso!";
    vm.processing = false;
  }

  function onError(e) {
    vm.processing = false;
    console.error(e);
    vm.error = e.message || e || 'Algo não funcionou bem';
  }

  function validate() {
    if(!vm.contract.address) throw "O campo <b>Endereço do contrato</b> é obrigatório";
    if(!vm.contract.paymentAmount) throw "O campo <b>Valor do pagamento</b> é obrigatório";
    if(!vm.contract.password) throw "O campo <b>Valor do pagamento</b> é obrigatório";
  }
}

module.exports = {
  template,
  controllerAs: 'vm',
  controller: ['ContractService', '$stateParams', 'ContractRepository', '$scope', Controller],
};
