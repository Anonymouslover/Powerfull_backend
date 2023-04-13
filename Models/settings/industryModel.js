const mongoose=require("mongoose")

const industrysettingSchema=mongoose.Schema({
 
    // departmentname:{type:String,required:false},
    // recruitername:{type:String,required:false},
    industry:{type:String,required:false},
    // email:{type:String,required:false},
    // password:{type:String,required:false},
    // skillset:{type:String,required:false},
    // hiring:{type:String,required:false},
    // hiring:{type:String,required:false},
    

})

const industryModel=mongoose.model("industrysetting",industrysettingSchema)

module.exports=industryModel