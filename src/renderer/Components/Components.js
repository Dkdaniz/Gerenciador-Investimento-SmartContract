module.exports = 'Components';

const SideMenu = require('./SideMenu/SideMenu');
const TopBar = require('./TopBar/TopBar');
const Loading = require('./Loading/Loading');
const PageTitle = require('./PageTitle/PageTitle');
const FileRead = require('./FileRead/FileRead');
const BackButton = require('./BackButton/BackButton');
const Dropdown = require('./Dropdown/Dropdown');

angular.module('Components', [])
  .component('sideMenu', SideMenu)
  .component('topBar', TopBar)
  .component('loading', Loading)
  .component('pageTitle', PageTitle)
  .directive('fileread', FileRead)
  .directive('backButton', BackButton)
  .directive('dropdown', Dropdown);