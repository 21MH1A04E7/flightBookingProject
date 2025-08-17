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
        return res.status(StatusCodes.CREATED)
                .json(SuccessResponse)
    }catch(error){
        ErrorResponse.error=error
        return res.status(error.statusCode)
                .json(ErrorResponse)
    }
}   

module.exports={
    createCity
}