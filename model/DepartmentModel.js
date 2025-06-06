const mongoose=require('mongoose');
const DepartmentSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    hod:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:Number,
        require:true
    },
    status:{
        type:String,
        require:true
    },
},{ timestamps: true });
const Department=new mongoose.model("Department",DepartmentSchema);
module.exports=Department;