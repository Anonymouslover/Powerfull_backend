const mongoose=require("mongoose")

const countrysettingSchema=mongoose.Schema({
 
    country:{type:String,required:false},
    // recruitername:{type:String,required:false},
    // industry:{type:String,required:false},
    // skillset:{type:String,required:false},
    // hiring:{type:String,required:false},
    // hiring:{type:String,required:false},
    

})

const countryModel=mongoose.model("countrysetting",countrysettingSchema)

module.exports=countryModel