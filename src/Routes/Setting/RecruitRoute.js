const express = require("express")
const bcrypt = require("bcrypt")

const app = express.Router()


const recrcuitModel = require("../../Models/settings/recrcuitModel")

app.use(express.json())


// Recurcuit Department Route

app.post("/",async(req,res)=>{
    try{
      console.log(req.body)
      const recruitername = req.body.recruitername
      const email = req.body.email
      const password = req.body.email

      const hashedPassword = bcrypt.hashSync(password, 10);

        const datasave=new recrcuitModel({recruitername:recruitername,email:email,password:hashedPassword})
        await datasave.save()
        res.send("Recruit Manager is created")
    }
    catch(err){
      res.send("Recruit Manager is not created")
    }
})



app.get("/data",async(req,res)=>{

    const show = await recrcuitModel.find()
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
      const recruitername = req.body.recruitername;
      const email = req.body.email;
      const password = req.body.password;
      const hashedPassword = bcrypt.hashSync(password, 10);
      const  newcountry=await recrcuitModel.findByIdAndUpdate({"_id":id},{recruitername:recruitername,email:email,password:hashedPassword},{new:true})
      res.send("Recruit Manager is updated")
    }
    catch(err){
      res.send("Recruit Manager is not changed")
    }
  
})


app.delete("/delete/:id",async(req,res)=>{
  const id=req.params.id
   try{
      const newcaurse=await recrcuitModel.findByIdAndDelete({"_id":id})
      res.send("Department is deleted")
   }
   catch(err){
    res.send("Department is not deleted")
   }
})

// End recurcuit Department Route

module.exports=app
