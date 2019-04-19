require('./app.scss');
require('@uirouter/angularjs');
require('angular-input-masks');
require('angular-i18n/angular-locale_pt-br');
require('angular-sanitize');
require('angular-animate');

window.angular = require('angular');

const Root = require('./Containers/Root/RootModule');
const Home = require('./Containers/Home/HomeModule');
const Contract = require('./Containers/Contract/ContractModule');
const Settings = require('./Containers/Settings/SettingsModule');

const Components = require('./Components/Components');
const Services = require('./Services/Services');

angular.module('exemplecoin', [
  'ui.router',
  'ui.utils.masks',
  'ngSanitize',
  'ngAnimate',
  Components,
  Services,
  Root,
  Home,
  Settings,
  Contract,
]);

angular.module('exemplecoin')
  .config(require('./Config'));


document.querySelector("body").innerHTML = "<ui-view />";
angular.element(() => {
  angular.bootstrap(document, ['exemplecoin']);
});