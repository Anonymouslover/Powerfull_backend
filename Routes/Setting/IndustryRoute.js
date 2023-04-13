const express = require("express")


const app = express.Router()


const industryModel = require("../../Models/settings/industryModel")

app.use(express.json())


// Recurcuit Department Route

app.post("/",async(req,res)=>{
    try{
      console.log(req.body)
      const industry = req.body.industry
     
      
        const datasave=new industryModel({industry:industry})
        
        await datasave.save()
        res.send("Industry is created")
    }
    catch(err){
      res.send("Industry is not created")
    }
})



app.get("/data",async(req,res)=>{

    const show = await industryModel.find()
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
      const industry = req.body.industry
     
      const  newcountry=await industryModel.findByIdAndUpdate({"_id":id},{industry:industry},{new:true})
      res.send("Industry Manager is updated")
    }
    catch(err){
      res.send("Industry Manager is not changed")
    }
  
})


app.delete("/delete/:id",async(req,res)=>{
  const id=req.params.id
   try{
      const newcaurse=await industryModel.findByIdAndDelete({"_id":id})
      res.send("Industry is deleted")
   }
   catch(err){
    res.send("Industry is not deleted")
   }
})

// End recurcuit Department Route

module.exports=app
