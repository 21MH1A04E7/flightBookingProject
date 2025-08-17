const {City}= require('../models')
const CrudRepository=require('./curd-repository')

class CityRepository extends CrudRepository{
    constructor(knexInstant,tableName){
        super(knexInstant,tableName);
    }
    

}

module.exports=CityRepository