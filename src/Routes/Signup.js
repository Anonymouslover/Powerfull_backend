const express=require("express")

const app=express()


const cookieParser = require('cookie-parser');


app.use(express.json());
app.use(cookieParser());

const User=require("../Models/createAdmin");
const { generateToken } = require('../Helper/JWT_TOKEN');
// const JWT_SECRET = 'RAKESH_SHARMA_TOKEN';

app.post("/api",async(req,res)=>{

 
    try {
        const user = new User({
          email: req.body.email.toLowerCase(),
          password: req.body.password,
          name: req.body.name,
          phone: req.body.phone,
          role: req.body.role,
        });

        user.jwtToken = generateToken({ userId: user._id });

        await user.save();

        res.cookie('cns-token',user.jwtToken, {
          //maxAge: 60 * 60 * 1000, // set cookie expiration time to match token expiration time
          httpOnly: false,
          sameSite: true,
          secure: true,
          path: '/'
         
            
          });   
        
         
  
  
        
    // const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
   

    res.status(201).json({ message: 'User created successfully', token: user.jwtToken });
  } catch (error) {
    
    res.status(500).send({ message: 'Error creating user',error: error });
  }

})


module.exports=app