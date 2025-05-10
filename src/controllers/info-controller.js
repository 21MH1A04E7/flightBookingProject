const {StatusCodes}=require('http-status-codes')
const {Logger}=require('../config')
const info=(req,res)=>{
    Logger.info("v1/info route accessed")
    return res.status(StatusCodes.OK).json({
        success:true,
        message:'how are you',
        error:{},
        data:[]
    })
}

module.exports={
    info
}