const express = require("express")


const app = express.Router()


const setting = require("../../Models/settings/settingModel")

app.use(express.json())


// Manage Department Route

app.post("/manage",async(req,res)=>{
    try{
      console.log(req)
      const departmentname = req.body.departmentname
      
        const datasave=new setting({departmentname:departmentname})
        await datasave.save()
        res.send("Department is created")
    }
    catch(err){
      res.send("department is not created")
    }
})



app.get("/",async(req,res)=>{

    const show = await setting.find()
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
      const  newcountry=await setting.findByIdAndUpdate({"_id":id},{...req.body},{new:true})
      res.send("Department is updated")
    }
    catch(err){
      res.send("Department is not changed")
    }
  
})


app.delete("/delete/:id",async(req,res)=>{
  const id=req.params.id
   try{
      const newcaurse=await setting.findByIdAndDelete({"_id":id})
      res.send("Department is deleted")
   }
   catch(err){
    res.send("Department is not deleted")
   }
})

// End Manage Department Route

module.exports=app
