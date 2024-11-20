const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')

dotenv.config();

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' }); 
};


const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded);
        return decoded;
    } catch (err) {
        console.error("Error verifying token:", err); 
        return null;
    }
};

module.exports={generateToken,verifyToken}