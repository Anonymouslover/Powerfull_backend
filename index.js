const express=require("express")
require('dotenv').config()
const { createProxyMiddleware } = require('http-proxy-middleware');



const path=require("path")
const app=express()

const port = 5000 || process.env.PORT


const cors = require("cors")
const cookieParser = require("cookie-parser");
const connection=require("./src/config/db")

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: process.env.CLIENT_HOST }));


app.use(express.static(path.join(__dirname)));



const loginRoute=require("./src/Routes/Login")
const signupRoute = require("./src/Routes/Signup")
const adminRoute=require("./src/Routes/createAdminRoute")
const User = require("./src/Routes/User");

const jobposting = require('./src/Routes/JobPostingRoute')
const jobapply  = require('./src/Routes/JobApplyRoute')
const departmentsetting = require('./src/Routes/Setting/DepartmentRoute')
const recruitsetting = require('./src/Routes/Setting/RecruitRoute')
const industrysetting = require('./src/Routes/Setting/IndustryRoute')
const skillsetsetting = require('./src/Routes/Setting/SkillsetRoute')
const hiringsetting = require('./src/Routes/Setting/HiringRoute')   
const interviewsetting = require('./src/Routes/Setting/InterviewRoute')
const interviewnamesetting = require('./src/Routes/Setting/InterviewNameRoute')

const processsetting = require('./src/Routes/Setting/ProcessRoute')
const countrysetting = require('./src/Routes/Setting/CountryRoute')




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



// Serve static files from the build directory
app.use(express.static(path.join(__dirname, '/build')));

// Serve index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build/index.html'));
});



app.listen(port,async()=>{
    try {
        await connection;
        console.log(`Server Is Running On ${port}`);
      } catch (error) {
        console.error(`Rakesh Failed to connect to the database: ${error}`);
      }
})