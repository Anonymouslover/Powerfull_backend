const express=require("express")

const app=express.Router()


const superModel=require("../Models/superadminModel")

const bcrypt = require('bcrypt');
const saltRounds = 10;

var jwt = require('jsonwebtoken');
const authentication = require("../middleware/authentication");


app.use(express.json())


app.get("/",(req,res)=>{
    res.send("login here")
})



app.post("/register",(req,res)=>{
    console.log(req)
    const {firstname,lastname,email,password}=req.body
    try{
        bcrypt.hash(password, saltRounds, async(err, hash)=> {
            if(err){
                res.send("super admin is not registered")
            }
            else{
                const superadmin=new superModel({firstname:firstname,lastname:lastname,email:email,password:hash})
                await superadmin.save()
                res.send({msg:"super admin is created"})
            }
           
        });
    }catch(err){
       res.send({msg:"user is not registered",err:err.message})
    }
})

app.post("/login",authentication, async(req,res)=>{
    const {email,password}=req.body
    try{
       const superadmin=await superModel.findOne({email})
       bcrypt.compare(password, superadmin.password, (err, result)=> {
        if(result){
            const token = jwt.sign({ userId:superadmin._id }, 'login');
            res.send({msg:"login successfully",token:token})
        }
        else{
          res.send({msg:"please enter valid credentials"})
        }
    });
    }
    catch(err){
        res.send({msg:"please enter valid credentials"})
    }
})


module.exports=app
