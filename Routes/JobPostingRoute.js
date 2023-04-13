const express = require("express")


const app = express.Router()


const jobpostingModel = require("../Models/jobpostingModel")

// const bcrypt = require('bcrypt');
// const saltRounds = 10;

// var jwt = require('jsonwebtoken');


app.use(express.json())




app.get("", async (req, res) => {
   
   const job = await jobpostingModel.find()
try{
   if(job){
    res.send(job)
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

app.get("/:id", async (req, res) => {
    const slug = req.params.id;
try{
    // const jobpost = await jobpostingModel.exists({jobpostid:slug});
    const jobupdatedata = await jobpostingModel.find({jobpostid:slug}).select("_id").lean();
    if (jobupdatedata.length > 0) {
        const exists = await jobpostingModel.exists({ jobpostid: slug });
        if (exists) {
            const data = await jobpostingModel.findOne({jobpostid:slug})
            res.send(data)
        } else {
            res.status(404).send({ error: `The ${slug} resource was not found` });
       
        }
      } else {
            res.status(404).send({ error: `The ${slug} resource was not found` });
         
      }
    

} catch (err) {
    res.send({ msg: "Plz Try Again After Sometime", err: err.message })
  }

    
 
     
 })





app.post("/data", (req, res) => {
    console.log(req.body,73)

    const { positiontitle, positions, title, assignedrecruiter, targetdate, openingstatus, industry, departmentname, hiringmanager, dateopened, jobtype, workexperience, skillset, salary,jobcheck, city, country, stateprovince, postalcode,JobDescription,BenefitsCk,RequireCk } = req.body
  
    try {
        // if(positiontitle === "" || positions === "" || title === ""|| assignedrecruiter === "" || targetdate === ""|| openingstatus === ""|| industry === ""|| departmentname === ""|| hiringmanager === ""|| dateopened === ""|| jobtype === ""|| workexperience === ""|| skillset === ""|| salary=== ""){
        //     res.send({ required: `Plz Completed The Field` })
        // }
        const alphabet = String.fromCharCode(97 + Math.floor(Math.random() * 26));
        const name = positiontitle+'_'+alphabet;
        const random = Math.floor(Math.random() * 1000000);
        const jobpostid = `${name}_${random}`;
        console.log(jobpostid);
         
                const jobposted = new jobpostingModel({ positiontitle:positiontitle, positions:positions, title:title, assignedrecruiter:assignedrecruiter, targetdate:targetdate, openingstatus:openingstatus, industry:industry, departmentname:departmentname, hiringmanager:hiringmanager, dateopened:dateopened, jobtype:jobtype, workexperience:workexperience, skillset:skillset, salary:salary,jobcheck:jobcheck, city:city, country:country, stateprovince:stateprovince, postalcode:postalcode,JobDescription:JobDescription,BenefitsCk:BenefitsCk,RequireCk:RequireCk,jobpostid:jobpostid })
                
                jobposted.save()
                res.send({ msg: "Job Is Now Posted" })
          
      
    } catch (err) {
        res.send({ msg: "job is not posted", err: err.message })
    }

})


app.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id
     try{
        const newcaurse=await jobpostingModel.findByIdAndDelete({"_id":id})
        res.send("job is deleted")
     }
     catch(err){
      res.send("job is not deleted")
     }
  })




  app.patch("/update/:id",async(req,res)=>{
    const id=req.params.id
    console.log(id)
    try{
      const  newcountry=await jobpostingModel.findOneAndUpdate({jobpostid:id},{...req.body},{new:true})
      console.log(newcountry)
      res.send("job is updated")
    }
    catch(err){
      res.send("job is not changed")
    }
  
})
  
module.exports = app