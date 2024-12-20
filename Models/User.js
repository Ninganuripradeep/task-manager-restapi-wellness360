const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    }
})

// Pre-save hook to hash the password before saving
userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();

    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    next();
})

// Instance method to validate password
userSchema.methods.correctPassword=async function(candidatePassword){
    return bcrypt.compare(candidatePassword,this.password);
}

const User=mongoose.model('User',userSchema);
module.exports=User;
