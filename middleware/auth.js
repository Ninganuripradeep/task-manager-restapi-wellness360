const jwt=require('jsonwebtoken');
const {AppError}=require('../utils/AppError');
const{verifyToken}=require('../utils/jwtUtils');

// Middleware to protect routes requiring authentication
const protect=(req,res,next)=>{
    try{
        // Get the authorization header
        const authHeader=req.headers.authorization;
        
        // Check if the authorization header is missing or invalid
        if(!authHeader||!authHeader.startsWith('Bearer ')){
            console.log("Authorization header missing or invalid");
            return next(new AppError('Authorization header missing or invalid',401));
        }

        // Extract the token from the header
        const token=authHeader.split(' ')[1];

        // Verify the token
        const decoded=verifyToken(token);

        console.log("Decoded Token:",decoded);

        // Attach the decoded user info to the request object
        req.user=decoded;

        // Proceed to the next middleware or route handler
        next();
    }catch(error){
        // Handle token verification error
        console.error("Token verification error:",error.message);
        return next(new AppError('Unauthorized: Invalid token',401));
    }
};

module.exports={protect};
