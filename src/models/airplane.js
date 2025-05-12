const { Model } = require('objection');

class Airplane extends Model {
  static get tableName() {
    return 'airplane';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['modelNumber', 'capacity'],
      properties: {
        modelNumber: {
          type: 'string',
          default: ''
        },
        capacity: {
          type: 'integer',
          default: 0
        }
      }
    };
  }
}

module.exports = Airplane;
