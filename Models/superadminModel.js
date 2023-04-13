const mongoose=require("mongoose")

const superadminSchema=mongoose.Schema({
    name:{type:String,required:false},
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,default:"superadmin"},
    userId:{type:String,required:false},
},
{timestamp:true})

const superadminModel=mongoose.model("superadmin",superadminSchema)

module.exports=superadminModel   