const express=require("express")

const app=express.Router()

app.use(express.json())

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



const superadmin=require("../Models/superadminModel");

const counsellor=require("../Models/createAdmin")


app.post("/",async(req,res)=>{

    const email = req.body.email.toLowerCase();
    const password = req.body.password;
 
    const collections = [superadmin,counsellor];

    try{
        for (const collection of collections) {
            const cred = await collection.findOne({ email });
            if(cred){
                bcrypt.compare(password, cred.password, (err, result)=> {
                    if(result){
                        const token = jwt.sign({
                           _id: cred._id,
                            name: cred.name,
                            email: cred.email,
                            role: cred.role,
                        }, 'login');
                        res.send({token:token,msg:"login successfull"})
                    }
                    else{
                      res.send({msg:"please enter valid credentials"})
                    }
                });
            }
        }
    }
    catch(err){
        res.status(400).send("Invalid email or password...");
    }

})


module.exports=app