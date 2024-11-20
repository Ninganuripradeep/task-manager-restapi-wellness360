// Middleware to handle async errors automatically
const asyncHandler = (fn) => (req, res, next) => {
    // Execute the function and handle any errors with next() if they occur
    Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
