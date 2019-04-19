function ContractRepository (Database, $timeout) {

  this.create = async function (data) {
    return $timeout(() => {
      return Database.Contract.create(data);
    });
  }

  this.update = async function (id, data) {
    let contract = await this.find(id);
    return $timeout(() => {
      return contract.update(data);
    });
  }

  this.all = function (where = {}) {
    return $timeout(() => {
      return Database.Contract.findAll({where, raw: true});
    });
  }

  this.find = function (id) {
    return $timeout(() => {
      return Database.Contract.findByPk(id);
    });
  }

}

module.exports = ['Database', '$timeout', ContractRepository];