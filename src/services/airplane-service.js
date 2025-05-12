const {AirplaneRepository}=require('../repositories')
const knex=require('../db/knex')
const {Airplane}=require('../models')


async function createAirplane(data){
    const airplaneRepository=new AirplaneRepository(knex,Airplane.tableName)
    try{
        const airplane=await airplaneRepository.create(data)
        return airplane
    }catch(error){
        throw error;
    }
}

module.exports={
    createAirplane
}