const { Logger } = require('../config');


class CrudRepository {
  constructor(knexInstant,tableName) {
    this.table = tableName;
    this.knex=knexInstant;
  }

  async create(data) {
    try {
      const response = await this.knex(this.table).insert(data);
      return response;
    } catch (error) {
      Logger.error('Error in CrudRepository: create');
      console.log(error)
      throw error;
    }
  }

  async delete(id) {
    try {
      const deletedCount = await this.knex(this.table).where({ id }).del();
      return deletedCount;
    } catch (error) {
      Logger.error('Error in CrudRepository: delete');
      throw error;
    }
  }

  async get(id) {
    try {
      const record = await this.knex(this.table).where({ id }).first();
      return record;
    } catch (error) {
      Logger.error('Error in CrudRepository: get');
      throw error;
    }
  }

  async getAll() {
    try {
      const records = await this.knex(this.table).select('*');
      return records;
    } catch (error) {
      Logger.error('Error in CrudRepository: getAll');
      throw error;
    }
  }
}

module.exports = CrudRepository;
