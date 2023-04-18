const express   = require('express')
const app = express.Router()

const multermiddleware = require('../middleware/multermiddleware')
// const upload = multer({ dest: '../frontend/public/Uploads/Resume' });
const jobapplyModel = require('../Models/jobapplyModel')
const jobpostingModel = require("../Models/jobpostingModel")


app.use(express.json())

// const upload = multer({ dest: "uploads/" });

app.get("", async (req,res) => {
    
    // const { title } = req.params.title;


    const jobdetail = await jobapplyModel.find({})
    



    try{
        if(jobdetail){
            res.send(jobdetail)
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


app.get("/showdata/:id", async (req, res) => {
    const slug = req.params.id;
    
try{
    // const jobpost = await jobpostingModel.exists({jobpostid:slug});
    const jobupdatedata = await jobapplyModel.find({_id:slug}).select("_id").lean();
    console.log(jobupdatedata,48)
    if (jobupdatedata.length > 0) {
        const exists = await jobapplyModel.exists({_id: slug });
        console.log(exists)
        if (exists) {
            const data = await jobapplyModel.findOne({_id:slug})
            
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


app.get("/posts/:id", async (req,res) => {
    const id = req.params.id;
    // const { title } = req.params.title;


    const jobdetail = await jobpostingModel.findOne({_id:id})
    console.log(jobdetail)



    try{
        if(jobdetail){
            res.send(jobdetail)
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


app.post("/",multermiddleware.fields([{ name: "resume", maxCount: 1 },{ name: "profile", maxCount: 1 }]),(req, res) => {
    // console.log(req.files.resume[0].path,104)
    // console.log(req.body)
    
    const { respect, firstname, email, graduationyear, experienceyear, currentctc, noticeperiod, vacancy, preferredlocation, lastname, contact, gender, currentemployer, expectedctc, skillset, currentlocation} = req.body
    // const photo=resume
    

    try {
        // const alphabet = String.fromCharCode(97 + Math.floor(Math.random() * 26));
        const name = "Candidate";
        const random = Math.floor(Math.random() * 1000000);
        const candidateid = `${name}_${random}`;
         
                const jobapply = new jobapplyModel({ candidateid:candidateid ,firstname:respect+' '+firstname+' '+lastname, email:email, graduationyear:graduationyear, experienceyear:experienceyear, currentctc:currentctc, noticeperiod:noticeperiod, vacancy:vacancy, preferredlocation:preferredlocation, contact:contact, gender:gender, currentemployer:currentemployer,expectedctc:expectedctc, skillset:skillset, currentlocation:currentlocation,resume:req.files.resume[0].filename,profile:req.files.profile[0].filename})
                jobapply.save()

                // const applicationstatus = new ApplicationStatus({jobapply:jobapply._id})
                // applicationstatus.save()
                res.send({ msg: "Your Application is Submitted successfully" })
          
      
    } catch (err) {
        res.send({ msg: "Some Error Occured Try After Some Time", err: err.message })
    }

})


app.patch("/update/:id",multermiddleware.fields([{ name: "pdf", maxCount: 1 },{ name: "image", maxCount: 1 }]),async(req,res)=>{
    const id=req.params.id
    console.log(id)
    console.log(req.body,134)
    console.log(req,135)

    const {  firstname, email, graduationyear, experienceyear, currentctc, noticeperiod, vacancy, preferredlocation, contact, gender, currentemployer, expectedctc, skillset, currentlocation,pdf,image} = req.body
 
    try{
        if(req.files && req.files.pdf && req.files.pdf[0] || req.files.image && req.files.image[0]){
            // console.log(req.files.pdf,142);
            // console.log(req.files.image,143)

            if(req.files && Object.keys(req.files).length == 2){
                const  newcountry=await jobapplyModel.findByIdAndUpdate({"_id":id},{firstname:firstname, email:email, graduationyear:graduationyear, experienceyear:experienceyear, currentctc:currentctc, noticeperiod:noticeperiod, vacancy:vacancy, preferredlocation:preferredlocation, contact:contact, gender:gender, currentemployer:currentemployer,expectedctc:expectedctc, skillset:skillset, currentlocation:currentlocation,resume:req.files.pdf[0].filename,profile:req.files.image[0].filename},{new:true})
                console.log(newcountry,145)
            }
            else{
              
                 res.send("RESUME AND PROFILE NOT SET").status(400)
            }

                

            
        }
        else if (req.files && Object.keys(req.files).length === 0){
            const  newcountry=await jobapplyModel.findByIdAndUpdate({"_id":id},{firstname:firstname, email:email, graduationyear:graduationyear, experienceyear:experienceyear, currentctc:currentctc, noticeperiod:noticeperiod, vacancy:vacancy, preferredlocation:preferredlocation, contact:contact, gender:gender, currentemployer:currentemployer,expectedctc:expectedctc, skillset:skillset, currentlocation:currentlocation,resume:pdf,profile:image},{new:true})

            // console.log(newcountry,139)
        }
        // else if(req.files){
        //     const  newcountry=await jobapplyModel.findByIdAndUpdate({"_id":id},{firstname:firstname, email:email, graduationyear:graduationyear, experienceyear:experienceyear, currentctc:currentctc, noticeperiod:noticeperiod, vacancy:vacancy, preferredlocation:preferredlocation, contact:contact, gender:gender, currentemployer:currentemployer,expectedctc:expectedctc, skillset:skillset, currentlocation:currentlocation,resume:req.files.resume[0].filename,profile:req.files.profile[0].filename},{new:true})
        //     console.log(newcountry,145)
             
        // }
        res.send("job is updated")
      
     
    }
    catch(err){
      res.send("job is not changed" + err)
    }
  
})


app.patch("/notes/update/:id",async(req,res)=>{
    const id=req.params.id
console.log(req.body,180)
console.log(req.file,181)
    const { notetype,notesdes } = req.body
    const notesupdatetime = new Date();
 
    try{
       
            const  newcountry=await jobapplyModel.findByIdAndUpdate(id,{ $push: { notetype:notetype, notesdes:notesdes,notesupdatetime:notesupdatetime } },{new:true})
            console.log(newcountry,145)
            res.send("job is updated")
            // console.log(newcountry,139)
        
     
    }
    catch(err){
      res.send("job is not changed" + err)
    }
  
})


app.patch("/attachment/update/:id",multermiddleware.single('fileupload'),async(req,res)=>{
    const id=req.params.id
console.log(req.body,180)
console.log(req.file,181)
    const { filename } = req.body
   
 
    try{
       
            const  newcountry=await jobapplyModel.findOneAndUpdate(id,{ $push: { filename:filename, fileupload:req.file.filename } },{new:true})
            console.log(newcountry,145)
            res.send("job is updated")
            // console.log(newcountry,139)
        
     
    }
    catch(err){
      res.send("job is not changed" + err)
    }
  
})



app.patch("/rating/update/:id",async(req,res)=>{
    const id=req.params.id
console.log(id,226);
    const { starrating,ratingcomment } = req.body
//    console.log(req.body,228)
 
    try{
       
            const  newcountry=await jobapplyModel.findOneAndUpdate({"candidateid":id},{starrating:starrating, ratingcomment:ratingcomment},{new:true})
            console.log(newcountry,145)
            res.send("job is updated")
            // console.log(newcountry,139)
        
     
    }
    catch(err){
      res.send("job is not changed" + err)
    }
  
})


app.patch("/status/update/:id",async(req,res)=>{
    const id=req.params.id

    const { status } = req.body

 
    try{
       
            const  newcountry=await jobapplyModel.findOneAndUpdate({"candidateid":id},{status:status},{new:true})
            console.log(newcountry,145)
            res.send("job is updated")
            // console.log(newcountry,139)
        
     
    }
    catch(err){
      res.send("job is not changed" + err)
    }
  
})


app.patch("/interview/update/:id",async(req,res)=>{
    const id=req.params.id
  
    const { interviewerName ,interviewers,from,to,scheduleComments} = req.body

 
    try{
       
            const  newcountry=await jobapplyModel.findOneAndUpdate({"candidateid":id},{interviewerName:interviewerName,interviewers:interviewers,from:from,to:to,scheduleComments:scheduleComments},{new:true})
            console.log(newcountry,145)
            res.send("Interview is updated")
            // console.log(newcountry,139)
        
     
    }
    catch(err){
      res.send("Interview is not changed" + err)
    }
  
})

app.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id
     try{
        const newcaurse=await jobapplyModel.findByIdAndDelete({"_id":id})
        res.send("user is deleted")
     }
     catch(err){
      res.send("user is not deleted")
     }
  })


module.exports = app
