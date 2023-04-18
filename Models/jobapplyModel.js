const mongoose=require("mongoose")

const jobapplySchema=mongoose.Schema({
    
    candidateid: {type:String,required:true,unique: true },
    firstname: {type:String,required:true},
    rating: {type:String,required:false},
    email:{type:String,default:0},
    graduationyear:{type:Date,required:false},
    experienceyear:{type:String,required:false},
    currentctc:{type:String,required:false},
    noticeperiod:{type:String,required:false},
    vacancy:{type:String,required:false},
    preferredlocation:{type:String,required:false},
    contact:{type:String,required:false},
    gender:{type:String,required:false},
    currentemployer:{type:String,required:false},
    expectedctc:{type:String,required:false},
    skillset:{type:Array,required:false},
    currentlocation:{type:String,required:false},
    resume:{type:String,required:false},
    profile:{type:String,required:false},
    status:{type:String,default:"In-Process"},
    notetype:[{type:String,required:false}],
    notesdes:[{type:String,required:false}],
    notesupdatetime:[{type:String,required:false}],
    filename:[{type:String,required:false}],
    fileupload:[{type:String,required:false}],
    starrating:{type:String,required:false},
    ratingcomment:{type:String,required:false},
    interviewerName:{type:String,required:false},
    interviewers:{type:String,required:false},
    from:{type:String,required:false},
    to:{type:String,required:false},
    scheduleComments:{type:String,required:false},
},
{timestamps:true}
)

const jobapplyModel=mongoose.model("jobapply",jobapplySchema)

module.exports=jobapplyModel