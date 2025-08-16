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

async function getAirplanes() {
    const airplaneRepository=new AirplaneRepository(knex,Airplane.tableName)
    try{
        const airplances=await airplaneRepository.getAll(knex,Airplane.tableName)
        return airplances
    }catch(error){
        throw new AppError("Internal server error: Can not fetch the data of all airplane",StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
async function getAirplane(id) {
    const airplaneRepository=new AirplaneRepository(knex,Airplane.tableName)
    try{
        const airplane=await airplaneRepository.get(id)
        return airplane
    }catch(error){
        throw new AppError("Internal server error: Can not feth the data of plance",StatusCodes.INTERNAL_SERVER_ERROR)
    }
    
}

async function  deleteAirplane(id) {
     const airplaneRepository=new AirplaneRepository(knex,Airplane.tableName)
    try{
        const response=airplaneRepository.delete(id)
        return response
    }catch(error){
        if(error.StatusCodes===StatusCodes.NOT_FOUND){
            throw new AppError("The airplane you requested to delete not found",StatusCodes.NOT_FOUND)
        }
        throw new AppError("Internal server error: fail to delete the airplane",StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
module.exports={
    createAirplane,
    getAirplanes,
    getAirplane,
    deleteAirplane
}