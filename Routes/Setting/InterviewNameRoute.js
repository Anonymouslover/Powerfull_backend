const express = require("express")

const app = express.Router()


const interviewnameModel = require("../../Models/settings/interviewnameModel")

app.use(express.json())


// Interview Name Route

app.post("/",async(req,res)=>{
  console.log(req)
    try{
      console.log(req.body)
      const interviewname = req.body.interviewname

      
        const datasave=new interviewnameModel({interviewname:interviewname})
        await datasave.save()
        res.send("Interview Name is created")
    }
    catch(err){
      res.send("Interview Name is not created")
    }
})



app.get("/data",async(req,res)=>{
console.log("hello")
    const show = await interviewnameModel.find()
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
      const interviewname = req.body.interviewname


      const  newcountry=await interviewnameModel.findByIdAndUpdate({"_id":id},{interviewname:interviewname},{new:true})
      
      res.send("Interview Name is updated")
    }
    catch(err){
      res.send("Interview Name is not changed")
    }
  
})


app.delete("/delete/:id",async(req,res)=>{
  const id=req.params.id
   try{
      const newcaurse=await interviewnameModel.findByIdAndDelete({"_id":id})
      res.send("Interview Name is deleted")
   }
   catch(err){
    res.send("Interview Name is not deleted")
   }
})

// End recurcuit Department Route

module.exports=app
