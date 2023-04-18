const jwt = require("jsonwebtoken")
const User = require("../Models/createAdmin")
const { verifyToken, generateToken } = require('../Helper/JWT_TOKEN');

const authentication=(req,res,next)=>{
 
    const token=req.body
    const cookie = req.cookies['cns-token']
    const p = verifyToken(cookie)
    console.log(verifyToken,10)
    verifyToken(cookie, (err, decoded) =>{
        if(decoded){
            const userId=decoded._id
            console.log(userId,13)
            req.body.userId=userId
            next()
        }   
        else{
            res.send("invalid token")
        }
      });
}

module.exports=authentication