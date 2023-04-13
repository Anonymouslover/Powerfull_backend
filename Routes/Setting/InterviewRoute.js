const express = require("express")
const bcrypt = require("bcrypt")

const app = express.Router()


const interviewModel = require("../../Models/settings/interviewModel")

app.use(express.json())


// Recurcuit Department Route

app.post("/",async(req,res)=>{
    try{
      console.log(req.body)
      const interview = req.body.interview
      const email = req.body.email
      const password = req.body.email

      const hashedPassword = bcrypt.hashSync(password, 10);
        const datasave=new interviewModel({interview:interview,email:email,password:hashedPassword})
        await datasave.save()
        res.send("Interview is created")
    }
    catch(err){
      res.send("Interview is not created")
    }
})



app.get("/data",async(req,res)=>{

    const show = await interviewModel.find()
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
      const interview = req.body.interview
      const email = req.body.email
      const password = req.body.email

      const hashedPassword = bcrypt.hashSync(password, 10);

      const  newcountry=await interviewModel.findByIdAndUpdate({"_id":id},{interview:interview,email:email,password:hashedPassword},{new:true})
      
      res.send("Interview Manager is updated")
    }
    catch(err){
      res.send("Interview Manager is not changed")
    }
  
})


app.delete("/delete/:id",async(req,res)=>{
  const id=req.params.id
   try{
      const newcaurse=await interviewModel.findByIdAndDelete({"_id":id})
      res.send("Interview is deleted")
   }
   catch(err){
    res.send("Interview is not deleted")
   }
})

// End recurcuit Department Route

module.exports=app
