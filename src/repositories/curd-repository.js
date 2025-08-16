const { StatusCodes } = require('http-status-codes');
const { Logger } = require('../config');
const AppError = require('../utils/errors/app-error');


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
      if(!deletedCount){
        throw new AppError("Not able to found the resource",StatusCodes.NOT_FOUND)
      }
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
  async update(data) {
  try {
    const records = await this.knex(this.table)
      .where({ id: data.id })
      .update(data);

    if (records === 0) {
      throw new AppError("Not able to find the resource", StatusCodes.NOT_FOUND);
    }

    return records; 
  } catch (error) {
    Logger.error("Error in CurdRepository : update");
    throw error;
  }
}

}

module.exports = CrudRepository;
