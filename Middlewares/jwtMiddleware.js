const jwt = require('jsonwebtoken');
const jwtMiddleware = (req, res, next) => {
    console.log("inside Jwt Middleware");
    //here split is used to remove the beaerer and remaining token will be display
    const token = req.headers['authorization'].split(' ')[1];
    console.log("token:", token);
    if (!req.headers['authorization']){
        res.status(401).json("Authorization failed , please login")
    }
    try {
        // jwt.verify() method is used to decrypt the token 
        const jwtResponse=jwt.verify(token,"userpwd123")
        console.log(jwtResponse);
        req.payload = jwtResponse.userId;
        next();
    }
    catch (err) {
        res.status(401).json("Authorization Failed. Please Login" );
    }
}
module.exports = jwtMiddleware;