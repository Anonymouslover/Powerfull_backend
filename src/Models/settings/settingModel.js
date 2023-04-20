const mongoose=require("mongoose")

const departmentsettingSchema=mongoose.Schema({
 
    departmentname:{type:String,required:false},
    // recruitername:{type:String,required:false},
    // industry:{type:String,required:false},
    // skillset:{type:String,required:false},
    // hiring:{type:String,required:false},
    // hiring:{type:String,required:false},
    

})

const settingModel=mongoose.model("departmentsetting",departmentsettingSchema)

module.exports=settingModel