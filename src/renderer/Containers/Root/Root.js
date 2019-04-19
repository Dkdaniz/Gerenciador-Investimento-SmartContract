const template = require('./Root.html').default;
const upload = require('./Gdrive.js')

require('./Root.scss');

function Controller(ContractRepository, ContractService, Settings) {
  let vm = this;

  vm.$onInit = init;
  vm.error = [];
  vm.menu = [
    {
      label: "Menu", 
      items: [
        {label: 'Painel', sref: 'root.home'},
        {label: 'Contratos', sref: 'root.listContracts'},
        {label: 'Configurações', sref: 'root.settings'},
      ]
    }
  ];

  function init() {
    const settings = Settings.get();

    checkContracts();
    upload(settings.databasePath + '/exemplecoin.sqlite');
  }

  function checkContracts() {
    // codigo do loop
    // Usar ContractRepository e ContractService
    ContractRepository.all({status: 'pending'})
      .then(contracts => {

        contracts.forEach(contractPending => {
          if(contractPending.address == null){
            ContractService.getContract(contractPending,"concluded")
            .then(result => console.log(result))
            .catch(err => console.log(err));
          }

          if(contractPending.address != null){
            ContractService.getStatus(contractPending)
            .then(result => console.log(result))
            .catch(err => console.log(err));
          }
        });
        
        console.log(contracts)
      });
  }

}

module.exports = {
  template,
  controllerAs: 'vm',
  controller: [
    'ContractRepository', 
    'ContractService',
    'Settings',
    Controller
  ],
};
