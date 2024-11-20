const{generateToken}=require('../utils/jwtUtils');
const User=require('../Models/User');
const AppError=require('../utils/AppError');

exports.registerUser=async(req,res,next)=>{
    try{
        const{username,password}=req.body;
        const existingUser=await User.findOne({username});
        if(existingUser){
            return next(new AppError('username already exists',400));
        }

        const newUser=await User.create({username,password});
        res.status(200).json({
            status: 'success',
            message: 'User registered successfully!',
            data: {
                id: newUser._id,
                username: newUser.username,
            }
        });
        
    }
    catch(err){
        next(err);
    }
}
exports.loginUser=async(req,res,next)=>{
    try{
        const{username,password}=req.body;
        const user=await User.findOne({username})
         
        if(!user||!(await user.correctPassword(password))){
            return next(new AppError('invalid credentials',401))
        }

        //generate jwt token
        const token=generateToken(user._id);
        res.status(200).json({
            status: 'success',
            message: 'Login successful',
            data: { token }
        });
    }catch(err){
        next(err);
    }
}