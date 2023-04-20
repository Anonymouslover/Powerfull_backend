const express = require("express")


const app = express.Router()


const country = require("../../Models/settings/countryModel")

app.use(express.json())


// Manage Department Route

app.post("/manage",async(req,res)=>{
    try{
      
      
        const datasave=new country({country:req.body.country})
        await datasave.save()
        res.send("country is created")
    }
    catch(err){
      res.send("country is not created")
    }
})



app.get("/",async(req,res)=>{

    const show = await country.find()
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
      const  newcountry=await country.findByIdAndUpdate({"_id":id},{...req.body},{new:true})
      res.send("country is updated")
    }
    catch(err){
      res.send("country is not changed")
    }
  
})


app.delete("/delete/:id",async(req,res)=>{
  const id=req.params.id
  
   try{
      const newcaurse=await country.findByIdAndDelete({"_id":id})
      res.send("country is deleted")
   }
   catch(err){
    res.send("country is not deleted")
   }
})

// End Manage Department Route

module.exports=app
