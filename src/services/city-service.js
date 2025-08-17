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

async function getCities() {
    const cityRepository=new CityRepository(knex,City.tableName)
    try{
        const airplances=await cityRepository.getAll(knex,City.tableName)
        return airplances
    }catch(error){
        throw new AppError("Internal server error: Can not fetch the data of all airplane",StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
async function getCity(id) {
    const cityRepository=new CityRepository(knex,City.tableName)
    try{
        const airplane=await cityRepository.get(id)
        return airplane
    }catch(error){
        throw new AppError("Internal server error: Can not feth the data of plance",StatusCodes.INTERNAL_SERVER_ERROR)
    }
    
}

async function  deleteCity(id) {
     const cityRepository=new CityRepository(knex,City.tableName)
    try{
        const response=cityRepository.delete(id)
        return response
    }catch(error){
        if(error.StatusCodes===StatusCodes.NOT_FOUND){
            throw new AppError("The airplane you requested to delete not found",StatusCodes.NOT_FOUND)
        }
        throw new AppError("Internal server error: fail to delete the airplane",StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function updateCity(data) {
    const cityRepository=new CityRepository(knex,City.tableName)
    try{
        const response=cityRepository.update(data)
        return response
    }catch(error){
        if(error.StatusCodes===StatusCodes.NOT_FOUND){
            throw new AppError("The airplane you requested to update not found",StatusCodes.NOT_FOUND)
        }
        throw new AppError("Internal server error: fail to delete the airplane",StatusCodes.INTERNAL_SERVER_ERROR)
    }
  
}

module.exports={
    createCity,
    getCities,
    getCity,
    deleteCity,
    updateCity
}