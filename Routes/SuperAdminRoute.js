const express=require("express")

const app=express.Router()




const superModel=require("../Models/superadminModel")

const bcrypt = require('bcrypt');
const saltRounds = 10;

var jwt = require('jsonwebtoken');


app.use(express.json())




app.get("/",async(req,res)=>{
   const user=await superModel.find()
   res.send(user)
})



app.post("/register",(req,res)=>{
    const {name,email,password}=req.body

    try{
        bcrypt.hash(password, saltRounds, async(err, hash)=> {
            if(err){
                res.send("super admin is not registered")
            }
            else{
                const superadmin=new superModel({name,email:email,password:hash})
                await superadmin.save()
                res.send({msg:"super admin is created"})
            }
           
        }); 
    }catch(err){
       res.send({msg:"user is not registered",err:err.message})
    }
})

app.post("/login",async(req,res)=>{
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

// app.patch("/:id",upload.single("image"),async(req,res)=>{
//    const path=req.file.path
//    console.log(req.file.path)
//     const {firstname,email,password ,address,zipcode,country,image}=req.body

//     const id=req.params.id
//     const user=await superModel.find({email})
//     console.log(path)
//     if(user.length==0){
//         if(image)
//         {
//             bcrypt.hash(password, saltRounds, async(err, hash)=> {
//                 if(err){
//                     res.send("super admin is not registered")
//                 }
//                 else{
//                     const superadmin=await superModel.findByIdAndUpdate({"_id":id},{firstname:firstname,email:email,password:password,address:address,zipcode:zipcode,country:country,image:path})
//                         await superadmin.save()
//                         res.send({msg:"super admin is created"})
//                 }
//                }); 
//         }
//         else{
//             bcrypt.hash(password, saltRounds, async(err, hash)=> {
//                 if(err){
//                     res.send("super admin is not registered")
//                 }
//                 else{
//                         const superadmin=await superModel.findByIdAndUpdate({"_id":id},{firstname:firstname,lastname:lastname,email:email,password:hash,address:address,zipcode:zipcode,country:country})
//                         await superadmin.save()
//                         res.send({msg:"super admin is created"})
//                 }
//                }); 
//         }
        
//     }
//     else{
//         res.send("This email is already exist")
//     }
   
// })


module.exports=app