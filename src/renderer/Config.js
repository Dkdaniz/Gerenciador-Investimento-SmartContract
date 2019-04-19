module.exports = [
  '$urlRouterProvider',
  ($urlRouterProvider) => {
    $urlRouterProvider.otherwise('/home');
  },
];