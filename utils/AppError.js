class AppError extends Error {
    constructor(message, statusCode, type = 'AppError') {
        super(message);  // Inherit from the Error class
        this.statusCode = statusCode;  // Set the status code for the error
        this.isOperational = true;  // Flag to indicate it's an operational error
        this.type = type;  // Set the error type
        Error.captureStackTrace(this, this.constructor);  // Capture the stack trace
    }
}

class NotFoundError extends AppError {
    constructor(message) {
        // Default to 'Resource not found' if no message is provided
        super(message || 'Resource not found', 404, 'NotFoundError');
    }
}

class ValidationError extends AppError {
    constructor(message) {
        // Default to 'Validation failed' if no message is provided
        super(message || 'Validation failed', 400, 'ValidationError');
    }
}

module.exports = {
    AppError,
    NotFoundError,
    ValidationError
};
