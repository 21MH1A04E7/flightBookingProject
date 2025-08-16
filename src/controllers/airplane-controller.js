const {AirplaneService}=require('../services')
const { StatusCodes } = require('http-status-codes');
const {ErrorResponse,SuccessResponse}=require('../utils/common')
const Joi = require('joi');

async function createAirplane(req,res) {
    try{
        
        const airplaneSchema=Joi.object({
            modelNumber:Joi.string().min(3).max(25).required(),
            capacity:Joi.number().integer().min(1).required()
        })
        const {error,value}=airplaneSchema.validate(req.body)
        if(error){
            console.log('Validation Error ',error)
            ErrorResponse.message = error?.details[0]?.message;
            ErrorResponse.error = error.details.map(d => d.message);
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }
        const airplane=await AirplaneService.createAirplane({
            modelNumber:value.modelNumber,
            capacity:value.capacity
        })
        SuccessResponse.data=airplane
        return res.status(StatusCodes.CREATED)
                .json(SuccessResponse)
    }catch(error){
        ErrorResponse.error=error
        return res.status(error.statusCode)
                .json(ErrorResponse)
    }
}   

async function getAirplanes(req,res) {
    try{
        const airplanes=await AirplaneService.getAirplanes()
        if(!airplanes || airplanes.length<=0){
            SuccessResponse.message='airplane not found'
            SuccessResponse.data={}
            return res.status(StatusCodes.NOT_FOUND)
                    .json(SuccessResponse)
        }
        SuccessResponse.data=airplanes
        SuccessResponse.message='successfully fetch all the airplanes'
        return res.status(StatusCodes.OK)
                .json(SuccessResponse)
    }catch(error){
        ErrorResponse.error=error
        return res.status(error.statusCode)
                    .json(ErrorResponse)
    }
}

async function getAirplane(req,res) {
    try{
        const airplane=await AirplaneService.getAirplane(req.params.id)
        if(!airplane){
            SuccessResponse.message='airplane not found'
            SuccessResponse.data={}
            return res.status(StatusCodes.NOT_FOUND)
                    .json(SuccessResponse)
        }
        SuccessResponse.data=airplane
        SuccessResponse.message='Successfully fetch the airplane'
        return res.status(StatusCodes.OK)
                    .json(SuccessResponse)
    }catch(error){
        ErrorResponse.error=error
        return res.status(error.statusCode)
                    .json(ErrorResponse)
    }
}

async function  deleteAirplane(req,res) {
    try{
        const airplanes=await AirplaneService.deleteAirplane(req.params.id);
        SuccessResponse.message="Successfully deleted the Airplane"
        SuccessResponse.data=airplanes
        return res.status(StatusCodes.OK)
                .json(SuccessResponse)
    }catch(error){
        ErrorResponse.error=error
        return res.status(error.statusCode)
                    .json(ErrorResponse)
    }
    
}

async function updateAirplane(req,res) {
    try{
        const airplances=await AirplaneService.updateAirplane(req.body)
        SuccessResponse.data=airplances
        SuccessResponse.message="Airplane updated successfully"
        return res.status(StatusCodes.OK)
                .json(SuccessResponse)
    }catch(error){

    }
}
module.exports={
    createAirplane,
    getAirplanes,
    getAirplane,
    deleteAirplane,
    updateAirplane
}