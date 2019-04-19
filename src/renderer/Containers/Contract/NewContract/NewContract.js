const template = require('./NewContract.html').default;

function Controller(ContractService, $scope) {
  const vm = this;

  vm.contract = {};
  vm.processing = false;
  vm.create = create;
  vm.error = null;
  vm.success = null;

  function create() {
    vm.error = null;
    try {
      validate();
      createContract();
    } catch (e) {
      onError(e);
    }
  }

  function createContract() {
    vm.processing = true;
    ContractService.create(vm.contract)
      .then(result => $scope.$apply(onSuccess.bind(null, result)))
      .catch(err => $scope.$apply(onError.bind(null, err)));
  }

  function onSuccess(res) {
    vm.success = "<b>Contrato</b> criado com sucesso!";
    vm.processing = false;
    vm.contract = {};
  }

  function onError(e) {
    vm.processing = false;
    console.error(e);
    vm.error = e.message || e || 'Algo não funcionou bem';
  }

  function validate() {
    if(!vm.contract.customer) throw "O campo <b>Nome do Cliente</b> é obrigatório";
    if(!vm.contract.amount) throw "O campo <b>Valor do investimento</b> é obrigatório";
    if(!vm.contract.lack) throw "O campo <b>Carência</b> é obrigatório";
    if(!vm.contract.percentage) throw "O campo <b>% Investimento</b> é obrigatório";
    if(!vm.contract.password) throw "O campo <b>Password</b> é obrigatório";
  }
}

module.exports = {
  template,
  controllerAs: 'vm',
  controller: ['ContractService', '$scope', Controller],
};