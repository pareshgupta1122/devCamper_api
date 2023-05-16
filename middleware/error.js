
//Custom error handler to avoid use of the try catch

const ErrorResponse = require("../utlis/errorResponse");

const errorHandler=(err,req,res,next)=>{
  let error = { ...err };
  error.message = err.message;
  //log  to console for dev
  console.log(err);

  //mongoose bad OjectID

  if (err.name === 'CastError') {
    const message = `Resources not found with the id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }
  //MONGOOSE VALIDATION ERRORS

  if(err.name==='ValidationError'){
    const message = Object.values(err.errors).map(val=>val.message);
    error = new ErrorResponse(message, 404);

  }

  //mongoose duplicate key
  if (err.code === 11000) {
    const message = `Duplicate Field value entered`;
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    sucess: false,
    error: error.message || 'Server error',
  });
};
module.exports=errorHandler;