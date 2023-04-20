const mongoose=require("mongoose")

const interviewnamesettingSchema=mongoose.Schema({
 
    // departmentname:{type:String,required:false},
    // recruitername:{type:String,required:false},
    // industry:{type:String,required:false},
    // skillset:{type:String,required:false},
    interviewname:{type:String,required:false},
    // email:{type:String,required:false},
    // password:{type:String,required:false},
    // hiring:{type:String,required:false},
    

})

const interviewnameModel=mongoose.model("interviewnamesetting",interviewnamesettingSchema)

module.exports=interviewnameModel