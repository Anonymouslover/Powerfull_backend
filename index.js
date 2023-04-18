const express=require("express")
require('dotenv').config()

const path=require("path")
const app=express()

const port = 5000 || process.env.PORT


const cors = require("cors")
const cookieParser = require("cookie-parser");
const connection=require("./config/db")

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: process.env.CLIENT_HOST }));


app.use(express.static(path.join(__dirname)));



const loginRoute=require("./Routes/Login")
const signupRoute = require("./Routes/Signup")
const adminRoute=require("./Routes/createAdminRoute")
const User = require("./Routes/User");

const jobposting = require('./Routes/JobPostingRoute')
const jobapply  = require('./Routes/JobApplyRoute')
const departmentsetting = require('./Routes/Setting/DepartmentRoute')
const recruitsetting = require('./Routes/Setting/RecruitRoute')
const industrysetting = require('./Routes/Setting/IndustryRoute')
const skillsetsetting = require('./Routes/Setting/SkillsetRoute')
const hiringsetting = require('./Routes/Setting/HiringRoute')   
const interviewsetting = require('./Routes/Setting/InterviewRoute')
const interviewnamesetting = require('./Routes/Setting/InterviewNameRoute')

const processsetting = require('./Routes/Setting/ProcessRoute')
const countrysetting = require('./Routes/Setting/CountryRoute')




app.use("/api/jobcard",jobposting)
app.use("/api/jobapply",jobapply)
app.use("/api/setting",departmentsetting)
app.use("/api/setting/Recruit",recruitsetting)
app.use("/api/setting/industry",industrysetting)
app.use("/api/setting/skillset",skillsetsetting)
app.use("/api/setting/hiring",hiringsetting)
app.use("/api/setting/interview",interviewsetting)
app.use("/api/setting/interviewname",interviewnamesetting)

app.use("/api/setting/process",processsetting)
app.use("/api/setting/country",countrysetting)

app.use("/api/admin",adminRoute)
app.use("/api/login",loginRoute)
app.use("/api/signup",signupRoute)
app.use("/api/user",User)

app.get("/api/",(req,res)=>{
    res.send("hello")
})


var __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/build')));

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/build/index.html'))
);



app.listen(port,async()=>{
    try {
        await connection;
        console.log(`Server Is Running On ${port}`);
      } catch (error) {
        console.error(`Rakesh Failed to connect to the database: ${error}`);
      }
})