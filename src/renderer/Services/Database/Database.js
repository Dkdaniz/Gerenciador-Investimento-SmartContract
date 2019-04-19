const Sequelize = require('sequelize');
const SCHEMA = require('./schema');

function Database (Settings) {

  this.initialize = () => {
    const settings = Settings.get();

    if(!settings || !settings.databasePath) {
      throw new Error("Banco de dados não configurado");
    }

    const dbPath = settings.databasePath + '/exemplecoin.sqlite';

    this.sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: dbPath
    });

    return this.migrate().then(() => {

      this.Contract = this.sequelize.define('contract', {
        customer: {
          type: Sequelize.STRING
        },
        transaction: {
          type: Sequelize.STRING
        },
        number: {
          type: Sequelize.STRING
        },
        address: {
          type: Sequelize.STRING
        },
        status: {
          type: Sequelize.STRING
        }
      }, {
        tableName: 'contracts'
      });

      return this;
    });
  }

  this.migrate = () => {
    return this.sequelize.query(SCHEMA);
  }

}

module.exports = [
  'Settings', Database
];