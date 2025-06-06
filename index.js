require('dotenv').config();
const express=require('express');
const app=express();
const cors=require('cors');
const dbConnect=require('./utils/Database');
const UserRoute=require('./route/UserRoute');
const CourseRoute=require('./route/CourseRoute');
const DepartmentRoute=require('./route/DeparmentRoute');
const StudentRoute=require('./route/StudentRoute');
const AccountRoute=require('./route/AccountRoute');
const HistoryRoute=require("./route/HistoryRoute");
app.use(express.json());
app.use(cors());
app.use('/public/uploads',express.static('public/uploads'));
app.use('/api/user',UserRoute);
app.use('/api/course',CourseRoute);
app.use('/api/department',DepartmentRoute);
app.use('/api/student',StudentRoute);
app.use('/api/account',AccountRoute);
app.use('/api/history',HistoryRoute);
const port=process.env.PORT||5000;
app.listen(port,()=>{
    console.log(`server is running in ${port}`);
})