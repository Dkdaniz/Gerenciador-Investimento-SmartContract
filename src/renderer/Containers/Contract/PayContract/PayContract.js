const template = require('./PayContract.html').default;

function Controller(ContractService, $stateParams, ContractRepository, $scope) {
  var vm = this;

  vm.$onInit = init;
  vm.contract = {};
  vm.processing = false;
  vm.pay = pay;
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

  function pay() {
    vm.error = null;
    try {
      validate();
      payContract();
    } catch (e) {
      onError(e);
    }
  }

  function payContract() {
    vm.processing = true;
    ContractService.pay(vm.contract)
      .then(result => $scope.$apply(onSuccess.bind(null, result)))
      .catch(err => $scope.$apply(onError.bind(null, err)));
  }

  function onSuccess(res) {
    vm.success = "<b>Contrato</b> pago com sucesso!";
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
    if(!vm.contract.password) throw "O campo <b>Password</b> é obrigatório";
    if(!vm.contract.ERC20coinQuotation) throw "O campo <b>Cotação ERC20coin</b> é obrigatório";
    if(!vm.contract.customerWallet) throw "O campo <b>Wallet do Cliente</b> é obrigatório";
  }
}

module.exports = {
  template,
  controllerAs: 'vm',
  controller: ['ContractService', '$stateParams', 'ContractRepository', '$scope', Controller],
};
