const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Function to generate a JWT for a given userId
const generateToken = (userId) => {
    // Signs the payload with the secret key and sets the expiration to 1 hour
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Function to verify a JWT and return the decoded payload if valid
const verifyToken = (token) => {
    try {
        // Verifies the token using the secret key from environment variables
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded);
        return decoded; // Returns the decoded token if valid
    } catch (err) {
        console.error("Error verifying token:", err); 
        return null; // Returns null if token verification fails
    }
};

module.exports = { generateToken, verifyToken };
