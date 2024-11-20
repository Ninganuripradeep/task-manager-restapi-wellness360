const express=require('express');
const {loginUser,registerUser}=require('../controllers/authControllers');
const router=express.Router();

// Register route
router.post('/register',registerUser);

// Login route
router.post('/login',loginUser);

module.exports=router;
