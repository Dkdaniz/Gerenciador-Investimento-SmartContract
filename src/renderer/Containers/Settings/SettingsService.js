const fs = require('fs');
const homedir = require('os').homedir();
const configDir = `${homedir}/.exemplecoin`;
const pathConfig = `${configDir}/config.json`;

function SettingsService ($q, $rootScope) {
  var self = this;
  self.settings = null;


  self.save = function (settings) {
    return writeFile(settings);
  }

  self.createConfigFolder = async function () {
    return $q((resolve, reject) => {
      if(fs.existsSync(configDir)) {
        return resolve();
      }
      fs.mkdir(configDir, {recursive: true}, (err) => {
        if(err) {
          return reject(err);
        }
        resolve();
      });
    });
  }

  function writeFile(settings) {
    return $q((resolve, reject) => {
      let contents = JSON.stringify(settings);
      fs.writeFile(pathConfig, contents, (err) => {
        if(err) {
          return reject(err);
        }
        $rootScope.settings = self.settings = angular.copy(settings);
        resolve($rootScope.settings);
      });
    });
  }

  self.get = function () {
    if(self.settings) return $rootScope.settings = self.settings;
    try {
      let json = fs.readFileSync(pathConfig);
      return $rootScope.settings = JSON.parse(json);
    } catch (e) {
      return {databasePath: configDir};
    }
  }
}

module.exports = ['$q', '$rootScope', SettingsService];