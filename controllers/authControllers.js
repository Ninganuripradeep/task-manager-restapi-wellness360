const{generateToken}=require('../utils/jwtUtils'); 
const User=require('../Models/User'); 
const {AppError}=require('../utils/AppError'); 

// Controller to handle user registration
exports.registerUser=async(req,res,next)=>{
    try{
        const{username,password}=req.body; 

        // Check if the username already exists in the database
        const existingUser=await User.findOne({username});
        if(existingUser){
            return next(new AppError('Username already exists',400));
        }

        // Create a new user in the database
        const newUser=await User.create({username,password});

      
        res.status(200).json({
            status:'success',
            message:'User registered successfully!',
            data:{
                id:newUser._id,
                username:newUser.username,
            }
        });
    }catch(err){
        next(err);
    }
};

// Controller to handle user login
exports.loginUser=async(req,res,next)=>{
    try{
        const{username,password}=req.body;

        // Find the user in the database by username
        const user=await User.findOne({username});

        // Verify user existence and validate the provided password
        if(!user||!(await user.correctPassword(password))){
            return next(new AppError('Invalid credentials',401));
        }

        // Generate a JWT token for the authenticated user
        const token=generateToken(user._id);

      
        res.status(200).json({
            status:'success',
            message:'Login successful',
            data:{token}
        });
    }catch(err){
        next(err); 
    }
};
