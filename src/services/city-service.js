const {CityRepository}=require('../repositories')
const knex=require('../db/knex')
const {City}=require('../models')
const AppError=require('../utils/errors/app-error')
const { StatusCodes } = require('http-status-codes');
const { SuccessResponse } = require('../utils/common');

async function  createCity(data) {
    const cityRepository=new CityRepository(knex,City.tableName)
    try{
        const city=await cityRepository.create(data)
        return city
    }catch(error){
        if(error.code==='ER_DUP_ENTRY'){
            throw new AppError("same name of city is already created",StatusCodes.CONFLICT)
        }
        if(error.name=='TypeError'){
            throw new AppError("Cannot create a new city Object",StatusCodes.INTERNAL_SERVER_ERROR)
        }else if(error.name=='Error'){
            throw new AppError("pls check the value",StatusCodes.INTERNAL_SERVER_ERROR)
        }
        console.log('error',error.name)
        throw new AppError("Internal server error",StatusCodes.INTERNAL_SERVER_ERROR);
    }  
}
module.exports={
    createCity
}