const fs = require('fs');
const template = require('./Settings.html').default;

function Controller(Settings, Database) {
  const vm = this;

  vm.save = save;
  vm.processing = false;
  vm.error = null;
  vm.success = null;

  vm.settings = angular.copy(Settings.get()) || {databasePath: ''};

  function save () {
    vm.processing = true;
    vm.error = null;
    Settings.save(vm.settings)
      .then(() => Database.initialize())
      .then(() => {
        vm.processing = false;
        vm.success = "Configurações salvas com sucesso!";
      })
      .catch(err => {
        vm.processing = false;
        vm.error = err.message;
      });
  }
  
}

module.exports = {
  template,
  controllerAs: 'vm',
  controller: ['Settings', 'Database', Controller],
};
