class AppError extends Error {
    constructor(message, statusCode, type = 'AppError') {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        this.type = type; 
        Error.captureStackTrace(this, this.constructor);
    }
}

class NotFoundError extends AppError {
    constructor(message) {
        super(message || 'Resource not found', 404, 'NotFoundError');
    }
}
class ValidationError extends AppError {
    constructor(message) {
        super(message || 'Validation failed', 400, 'ValidationError');
    }
}
module.exports = {
    AppError,
    NotFoundError,
    ValidationError
};