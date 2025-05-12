const Airplane = require('../models/airplane')
const CrudRepository=require('./curd-repository')

class AirplaneRepository extends CrudRepository{
    constructor(knexInstant,tableName){
        super(knexInstant,tableName);
    }
    

}

module.exports=AirplaneRepository