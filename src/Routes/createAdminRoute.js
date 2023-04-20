
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const express = require("express");
const app = express.Router()
const  AdminModel=require("../Models/createAdmin")
const authentication = require("../middleware/authentication")




app.get("/", async (req, res) => {

  try {
   
    let counsellors = await AdminModel.find();
    return res.status(200).send(counsellors);
  } 
    catch (error) {

    res.status(500).send("Error: " + error.message);
  }
});



app.post("/createAdmin",authentication, async (req, res) => {
    const {name,email,password,phone,web}=req.body
    
   
    try{
      const user=await AdminModel.findOne({email})
      if (!user) {
        res.status(401).send("Invalid email or password");
        return;
      }

      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          // password is correct, generate JWT token and send it to client
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
          res.status(200).json({ token });
        } else {
          // password is incorrect
          res.status(401).send("Invalid email or password");
        }
      });
    } catch (err) {
      res.status(500).send("Server error");
    }
    
});

app.patch("/:id",async(req,res)=>{
  const id=req.params.id;
  try{
    const updatedCounsellor=await AdminModel.findByIdAndUpdate({"_id":id},{...req.body})
  res.send("Updated the counsellor")
  }catch(err){
    res.send("counsellor not updated")
  }
})

app.post("/login", async (req, res) => {

  let counsellor = await AdminModel.findOne({ email: req.body.email.toLowerCase()});

  if(!counsellor){
      return res.status(400).send("Invalid email or password...");
    }

  if(counsellor){
    
    const validPassword = await bcrypt.compare(req.body.password, counsellor.password);
    if (!validPassword)
    return res.status(400).send("Invalid email or password...");
        
    const token = jwt.sign(
      {
        _id: counsellor._id,
        name: counsellor.name,
        phone: counsellor.phone,
        email: counsellor.email,
        web : counsellor.web,
        role: counsellor.role,
      }
      );
      
      res.send(token);
    }
});

module.exports = app ;