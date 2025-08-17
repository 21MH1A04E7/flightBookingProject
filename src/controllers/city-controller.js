const {CityService}=require('../services')
const { StatusCodes } = require('http-status-codes');
const {ErrorResponse,SuccessResponse}=require('../utils/common')
const Joi = require('joi');
async function createCity(req,res) {
    try{
        
        const citySchema=Joi.object({
            name:Joi.string().min(2).max(25).required()
        })
        const {error,value}=citySchema.validate(req.body)
        if(error){
            console.log('Validation Error ',error)
            ErrorResponse.message = error?.details[0]?.message;
            ErrorResponse.error = error.details.map(d => d.message);
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }
        const city=await CityService.createCity({
            name:value.name
        })
        SuccessResponse.data=city
        SuccessResponse.message="Successfully create the city"
        return res.status(StatusCodes.CREATED)
                .json(SuccessResponse)
    }catch(error){
        ErrorResponse.error=error
        return res.status(error.statusCode)
                .json(ErrorResponse)
    }
}   

async function getCities(req,res) {
    try{
        const cities=await CityService.getCities()
        if(!cities || cities.length<=0){
            SuccessResponse.message='Cities not found'
            SuccessResponse.data={}
            return res.status(StatusCodes.NOT_FOUND)
                    .json(SuccessResponse)
        }
        SuccessResponse.data=cities
        SuccessResponse.message='successfully fetch all the Cities'
        return res.status(StatusCodes.OK)
                .json(SuccessResponse)
    }catch(error){
        ErrorResponse.error=error
        return res.status(error.statusCode)
                    .json(ErrorResponse)
    }
}

async function getCity(req,res) {
    try{
        const city=await CityService.getCity(req.params.id)
        if(!city){
            SuccessResponse.message='city not found'
            SuccessResponse.data={}
            return res.status(StatusCodes.NOT_FOUND)
                    .json(SuccessResponse)
        }
        SuccessResponse.data=city
        SuccessResponse.message='Successfully fetch the city'
        return res.status(StatusCodes.OK)
                    .json(SuccessResponse)
    }catch(error){
        ErrorResponse.error=error
        return res.status(error.statusCode)
                    .json(ErrorResponse)
    }
}

async function  deleteCity(req,res) {
    try{
        const cities=await CityService.deleteCity(req.params.id);
        SuccessResponse.message="Successfully deleted the city"
        SuccessResponse.data=cities
        return res.status(StatusCodes.OK)
                .json(SuccessResponse)
    }catch(error){
        ErrorResponse.error=error
        return res.status(error.statusCode)
                    .json(ErrorResponse)
    }
    
}

async function updateCity(req,res) {
    try{
        const cities=await CityService.updateCity(req.body)
        SuccessResponse.data=cities
        SuccessResponse.message="City updated successfully"
        return res.status(StatusCodes.OK)
                .json(SuccessResponse)
    }catch(error){
        ErrorResponse.error=error
        return res.status(error.statusCode)
                    .json(ErrorResponse)
    }
}
module.exports={
    createCity,
    getCities,
    getCity,
    deleteCity,
    updateCity
}