module.exports = 'Root';

angular.module('Root', [])
  .component('root', require('./Root'))
  .config([
    '$stateProvider',
    ($stateProvider) => {

      $stateProvider.state('root', {
        abstract: true,
        component: 'root',
        resolve: {
          database: ['Database', 'Settings', async function (Database, Settings) {
            try {
              await Settings.createConfigFolder();
              await Database.initialize();
              return true;
            } catch (e) {
              alert(e.message);
            }
          }]
        }
      });
    },
  ]);
