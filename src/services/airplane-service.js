const {AirplaneRepository}=require('../repositories')
const knex=require('../db/knex')
const {Airplane}=require('../models')
const AppError=require('../utils/errors/app-error')
const { StatusCodes } = require('http-status-codes');


async function createAirplane(data){
    const airplaneRepository=new AirplaneRepository(knex,Airplane.tableName)
    try{
        const airplane=await airplaneRepository.create(data)
        return airplane
    }catch(error){
        
        if(error.name=='TypeError'){
            throw new AppError("Cannot create a new Airplane Object",StatusCodes.INTERNAL_SERVER_ERROR)
        }else if(error.name=='Error'){
            throw new AppError("pls check the value",StatusCodes.INTERNAL_SERVER_ERROR)
        }

        console.log('error',error.name)

        throw new AppError("Internal server error",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports={
    createAirplane
}