const jwt = require("jsonwebtoken");

const User = require("../models/User");

const authMiddleware = async (req, res, next)=>{
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                sucess : false,
                message : "Unauthorized. Please Wait",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decoded.userId);
        if(!user){
            return res.status(401).json({
                success : false,
                message : "User no longer Exists.",
            });
        }
        req.user = user
        next();
    }catch(err){
        console.error(err);
        return res.status(401).json({
            sucess : false,
            message : "Invalid or Expired token",
        });
    }
}

module.exports = authMiddleware;