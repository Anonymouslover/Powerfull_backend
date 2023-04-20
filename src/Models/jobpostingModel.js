const mongoose=require("mongoose")

const jobpostingSchema=mongoose.Schema({
 
    jobpostid:{type:String,required:true},
    positiontitle:{type:String,required:false},
    positions:{type:String,required:false},
    title:{type:String,required:false},
    assignedrecruiter:{type:String,required:false},
    targetdate:{type:String,required:false},
    openingstatus:{type:String,required:false},
    industry:{type:String,required:false},
    departmentname:{type:String,required:false},
    hiringmanager:{type:String,required:false},
    dateopened:{type:String,required:false},
    jobtype:{type:String,required:false},
    workexperience:{type:String,required:false},
    skillset:{type:Array,required:false},
    salary:{type:String,required:false},
    jobcheck:{type:String,required:true},
    city:{type:String,required:false},
    country:{type:String,required:false},
    stateprovince:{type:String,required:false},
    postalcode:{type:String,required:false},
    JobDescription:{type:String,required:false},
    BenefitsCk:{type:String,required:false},
    RequireCk:{type:String,required:false},


})

const jobpostingModel=mongoose.model("jobposting",jobpostingSchema)

module.exports=jobpostingModel