const jwt = require("jsonwebtoken");

const authenticateToken = (req,res,next)=>{
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(token == null){
        return res.status(401).json({message:"Authentication token is required"});
    }

    jwt.verify(token,"bookstore123",(error,user)=>{
        if(error){
            return res.status(403).json({message:"Token is expired,please signIn Again"});
        }
        req.user=user;
        next();
    });

}

module.exports = {
    authenticateToken,
}