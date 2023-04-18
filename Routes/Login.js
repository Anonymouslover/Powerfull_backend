const express=require("express")

const app=express.Router()

const bcrypt = require("bcrypt");
const { verifyToken, generateToken } = require('../Helper/JWT_TOKEN');

app.use(express.json())


// const superadmin=require("../Models/superadminModel");

const User = require("../Models/createAdmin")


app.post("/",async(req,res)=>{

    const email = req.body.email.toLowerCase();
    const password = req.body.password;
    const user = await User.findOne({ email });


 try {
    
    
    if (!email || !password) {
      res.status(400).send("Username and Password are required");
    } 
    else if (user && user.email === email && user.verifyPassword(password)) {
      if (user.role === "superadmin") {
        console.log("hii");
        token = generateToken({
          _id: user._id,
          email: user.email,
          password: user.password,
          role: user.role,
        },'1h');
       
      } 
   
      
      if (token) {
       
        user.jwtToken = token;
        await user.save();
      
        
        res.cookie('cns-token',user.jwtToken, {
        //maxAge: 60 * 60 * 1000, // set cookie expiration time to match token expiration time
        httpOnly: true,
        sameSite: true,
        secure: true,
        path: '/'
       
          
        });   
      
       


        res.status(200).send({token: user.jwtToken,msg: "Login Successfull"});
      } else {
        res.status(401).send("Invalid credentials ");
      }
    } else {
        if (!user) {
            res.status(401).send("User not found");
        } else if (user.email !== email) {
          res.status(401).send("Invalid email");
        } else if (!user.verifyPassword(password)) {
          res.status(401).send("Invalid password");
        }
        
    }
  } catch (error) {
    res.status(500).send({ error: `Server Error Plz Try Again After Some Time ${error}`});
  }
  

})


module.exports=app