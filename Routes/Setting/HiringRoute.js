const express = require("express")
const bcrypt = require("bcrypt")

const app = express.Router()


const hiringModel = require("../../Models/settings/hiringModel")

app.use(express.json())


// Recurcuit Department Route

app.post("/",async(req,res)=>{
    try{
      console.log(req.body)
      const hiring = req.body.hiring
      const email = req.body.email
      const password = req.body.email

      const hashedPassword = bcrypt.hashSync(password, 10);
        const datasave=new hiringModel({hiring:hiring,email:email,password:hashedPassword})
        await datasave.save()
        res.send("hiring is created")
    }
    catch(err){
      res.send("hiring is not created")
    }
})



app.get("/data",async(req,res)=>{

    const show = await hiringModel.find({})
try{
   if(show){
    res.send(show)
    // const token = jwt.sign({ userId:superadmin._id }, 'login');
    // res.send({msg:"login successfully",token:token})
}
else{
  res.send({msg:"Some Issue Occured"})
}
}
catch(err){
    res.send({msg:"sorry go to back"})
}
})


app.patch("/update/:id",async(req,res)=>{
    const id=req.params.id
    try{
      const hiring = req.body.hiring
      const email = req.body.email
      const password = req.body.email

      const hashedPassword = bcrypt.hashSync(password, 10);

      const  newcountry=await hiringModel.findByIdAndUpdate({"_id":id},{hiring:hiring,email:email,password:hashedPassword},{new:true})
      res.send("hiring Manager is updated")
    }
    catch(err){
      res.send("hiring Manager is not changed")
    }
  
})


app.delete("/delete/:id",async(req,res)=>{
  const id=req.params.id
   try{
      const newcaurse=await hiringModel.findByIdAndDelete({"_id":id})
      res.send("hiring is deleted")
   }
   catch(err){
    res.send("hiring is not deleted")
   }
})

// End recurcuit Department Route

module.exports=app
