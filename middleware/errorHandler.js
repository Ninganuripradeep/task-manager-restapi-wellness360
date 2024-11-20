const AppError=require('../utils/AppError');

// General error handling middleware
const globalErrorHandler=(err,req,res,next)=>{
    console.error('Error',err);

    const response={
        status:'error',
        message:err.message||'Something went wrong',
    };

    // If it's an operational error, respond with the status code
    if(err.isOperational){
        return res.status(err.statusCode||500).json(response);
    }

    // For other errors, respond with a 500 status code
    res.status(500).json(response);
};

module.exports=globalErrorHandler;
