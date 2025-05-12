const { StatusCodes } = require("http-status-codes");

function validateCreateRequest(req, res, next) {
  if (!req.modelNumber) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      sucess: false,
      message: "Something went wrong while  creating an airplane",
      data: {},
      error: {explation:'Model Number not found in the incoming request in the correct form'},
    });
  }
  next()
}

module.exports={
    validateCreateRequest
}