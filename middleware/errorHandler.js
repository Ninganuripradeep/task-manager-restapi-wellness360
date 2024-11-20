const AppError=require('../utils/AppError');

//general error handling middleware
const globalErrorHandler = (err, req, res, next) => {
    console.error('Error', err);

    const response = {
        status: 'error',
        message: err.message || 'Something went wrong',
    };

    
    if (err.isOperational) {
        return res.status(err.statusCode || 500).json(response);
    }

    
    res.status(500).json(response);
};

module.exports=globalErrorHandler;

