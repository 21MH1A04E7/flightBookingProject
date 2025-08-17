const { Model } = require('objection');

class City extends Model {
  static get tableName() {
    return 'Cities';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        name: {
          type: 'string',
          minLength:2
        }
      }
    };
  }
  static get uniqueKeys(){
    return [[['name']]]
  }
}

module.exports = City;
