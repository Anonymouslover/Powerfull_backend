const bcrypt = require("bcrypt");
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
    const user=await AdminModel.findOne({email})
   
    try{
      if(user){
        res.send("councellor is not present").status(400)
      }
      else{
        bcrypt.hash(password, saltRounds, async(err, hash)=> {
          const counsellor=new AdminModel({name,email,password:hash,phone,web})
          await counsellor.save()
          res.send("counseller is created").status(200)
      });
      }
    }
    catch(err){
      res.send("Invalid User").status(500)
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