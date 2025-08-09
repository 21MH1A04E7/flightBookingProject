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
        const {error}=airplaneSchema.validate(req.body)
        if(error){
            ErrorResponse.message = error?.details[0]?.message;
            ErrorResponse.error = error?.details[0]?.message;
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }
        const airplane=await AirplaneService.createAirplane({
            modelNumber:req.body.modelNumber,
            capacity:req.body.capacity
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

module.exports={
    createAirplane
}