module.exports = 'Home';

angular.module('Home', [])
  .component('home', require('./Home'))
  .config([
    '$stateProvider',
    ($stateProvider) => {
      $stateProvider.state('root.home', {
        url: '/home',
        component: 'home',
      });
    },
  ]);
