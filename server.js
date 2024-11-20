const dotenv = require('dotenv');
dotenv.config();

const express=require('express');
const mongoose=require('mongoose');
const taskRoutes=require('./routes/taskRoutes');
const authRoutes=require('./routes/authRoutes');
const globalErrorHandler=require('./middleware/errorHandler');

const app=express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('mongodb connected');
}).catch(err=>{
    console.log('mongoodb connection failed',err);
})

//task routes
app.use('/api',taskRoutes);

//auth routes
app.use('/api/auth',authRoutes);
app.use(globalErrorHandler)

//export app for testing
module.exports=app;

const PORT=process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
});