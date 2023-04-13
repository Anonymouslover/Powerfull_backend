const express = require("express")


const app = express.Router()


const processsetting = require("../../Models/settings/processModel")

app.use(express.json())


// Manage Department Route

app.post("/manage",async(req,res)=>{
    try{
      console.log(req)
      const processname = req.body.processname
      
        const datasave=new processsetting({processname:processname})
        await datasave.save()
        res.send("Application Process is created")
    }
    catch(err){
      res.send("Application Process is not created")
    }
})



app.get("/",async(req,res)=>{

    const show = await processsetting.find()
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


app.patch("/:id",async(req,res)=>{
    const id=req.params.id
    try{
      const  newcountry=await processsetting.findByIdAndUpdate({"_id":id},{...req.body},{new:true})
      res.send("Application Process is updated")
    }
    catch(err){
      res.send("Application Process is not changed")
    }
  
})


app.delete("/delete/:id",async(req,res)=>{
  const id=req.params.id
   try{
      const newcaurse=await processsetting.findByIdAndDelete({"_id":id})
      res.send("Application Process is deleted")
   }
   catch(err){
    res.send("Application Process is not deleted")
   }
})

// End Manage Department Route

module.exports=app
