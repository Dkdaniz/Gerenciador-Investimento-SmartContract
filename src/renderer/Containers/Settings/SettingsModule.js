module.exports = 'Settings';

angular.module('Settings', [])
  .component('settings', require('./Settings'))
  .service('Settings', require('./SettingsService'))
  .config([
    '$stateProvider',
    ($stateProvider) => {
      $stateProvider.state('root.settings', {
        url: '/settings',
        component: 'settings',
      });
    },
  ]);
