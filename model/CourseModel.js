const mongoose=require('mongoose');
const CourseSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    duration:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    image:{
        type:String,
        require:true 
    },
    department:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    }
   
},{ timestamps: true });
const Course=new mongoose.model("Course",CourseSchema);
module.exports=Course;