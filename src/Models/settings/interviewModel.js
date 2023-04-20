const mongoose=require("mongoose")

const interviewsettingSchema=mongoose.Schema({
 
    // departmentname:{type:String,required:false},
    // recruitername:{type:String,required:false},
    // industry:{type:String,required:false},
    // skillset:{type:String,required:false},
    interview:{type:String,required:false},
    email:{type:String,required:false},
    password:{type:String,required:false},
    // hiring:{type:String,required:false},
    

})

const interviewModel=mongoose.model("interviewsetting",interviewsettingSchema)

module.exports=interviewModel