const jwt = require('jsonwebtoken');


const jwtAuthMiddleware = (req, res, next) => {
    //check if the Authorization header is present
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Token not found, kindly attach token in header to access ' }); // If no Authorization header, return unauthorized
    }


    // Extract the token from the Authorization header
    const token = req.headers.authorization?.split(' ')[1]; // Assuming the format is "Bearer

    // If no token is provided, return an unauthorized error
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try{
        //verify the jwt token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // attach user information to the request object
        req.user = decoded;
        next(); // Call the next middleware or route handler

    }
    catch (error) {
        console.error('JWT verification error:', error);
        return res.status(401).json({ message: 'Invalid token' }); // Token is invalid or expired
    }

}


//Function to generate JWT token
const generateToken = (userData) => {
    return jwt.sign({userData}, process.env.JWT_SECRET , { expiresIn: 3000}); //expires in 3000 sec 
}

module.exports = {jwtAuthMiddleware, generateToken};