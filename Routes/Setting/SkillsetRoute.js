const express = require("express")


const app = express.Router()


const skillsetModel = require("../../Models/settings/skillsetModel")

app.use(express.json())


// Recurcuit Department Route

app.post("/",async(req,res)=>{
    try{
      console.log(req.body)
      const skillset = req.body.skillset
    
        const datasave=new skillsetModel({skillset:skillset})
        await datasave.save()
        res.send("Skillset is created")
    }
    catch(err){
      res.send("Skillset is not created")
    }
})



app.get("/data",async(req,res)=>{

    const show = await skillsetModel.find()
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
      const skillset = req.body.skillset;
     

      const  newcountry=await skillsetModel.findByIdAndUpdate({"_id":id},{skillset:skillset},{new:true})
      res.send("Skillset Manager is updated")
    }
    catch(err){
      res.send("Skillset Manager is not changed")
    }
  
})


app.delete("/delete/:id",async(req,res)=>{
  const id=req.params.id
   try{
      const newcaurse=await skillsetModel.findByIdAndDelete({"_id":id})
      res.send("Skillset is deleted")
   }
   catch(err){
    res.send("Skillset is not deleted")
   }
})

// End recurcuit Department Route

module.exports=app
