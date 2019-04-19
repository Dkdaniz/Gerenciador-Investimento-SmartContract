module.exports = 'Services';

const Database = require('./Database/Database');

angular.module('Services', [])
  .service('Database', Database)