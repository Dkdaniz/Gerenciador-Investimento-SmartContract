module.exports = 'Contract';

angular.module('Contract', [])
  .component('listContracts', require('./ListContracts/ListContracts'))
  .component('newContract', require('./NewContract/NewContract'))
  .component('payContract', require('./PayContract/PayContract'))
  .component('creditContract', require('./CreditContract/CreditContract'))
  .component('closeContract', require('./CloseContract/CloseContract'))
  .factory('ContractService', require('./ContractService'))
  .service('ContractRepository', require('./ContractRepository'))
  .config([
    '$stateProvider',
    ($stateProvider) => {
      $stateProvider
        .state('root.listContracts', {
          url: '/listContracts',
          component: 'listContracts',
        })
        .state('root.newContract', {
          url: '/newContract',
          component: 'newContract',
        })
        .state('root.payContract', {
          url: '/listContracts/{id}/payContract',
          component: 'payContract',
        })
        .state('root.creditContract', {
          url: '/listContracts/{id}/creditContract',
          component: 'creditContract',
        })
        .state('root.closeContract', {
          url: '/listContracts/{id}/closeContract',
          component: 'closeContract',
        });
    },
  ]);
