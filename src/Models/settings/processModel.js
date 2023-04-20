const mongoose=require("mongoose")

const processsettingSchema=mongoose.Schema({
 
    processname:{type:String,required:false},
    // recruitername:{type:String,required:false},
    // industry:{type:String,required:false},
    // skillset:{type:String,required:false},
    // hiring:{type:String,required:false},
    // hiring:{type:String,required:false},
    

})

const processModel=mongoose.model("processsetting",processsettingSchema)

module.exports=processModel