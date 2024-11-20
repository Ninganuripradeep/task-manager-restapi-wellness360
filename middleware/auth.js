// const {verifyToken}=require('../utils/jwtUtils')
// const AppError=require('../utils/AppError')

// const protect = (req, res, next) => {
//     const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    
//     if (!token) {
//         return next(new AppError('Token missing, authorization denied', 401));
//     }
//     const decoded = verifyToken(token); 
//     if (!decoded) {
//         return next(new AppError('Token expired or invalid, please log in again', 401));
//     }
//     req.user = decoded;
//     next();
// };
// module.exports={protect};


const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const { verifyToken } = require('../utils/jwtUtils');
const protect = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            console.log("Authorization header missing or invalid");
            return next(new AppError('Authorization header missing or invalid', 401));
        }

        const token = authHeader.split(' ')[1];
        const decoded = verifyToken(token);

        console.log("Decoded Token:", decoded);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Token verification error:", error.message);
        return next(new AppError('Unauthorized: Invalid token', 401));
    }
};

module.exports = { protect };
