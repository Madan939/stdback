const mongoose=require('mongoose');
const AccountSchema=new mongoose.Schema({
    studentId:{
        type:String,
        required:true
    },
    courseId:{
        type:String,
        required:true
    }, 
     name:{
        type:String,
        required:true
    },
    totalAmount:{
        type:String,
        require:true
    },
    paidfee:{
        type:Number,
        require:true
    },
    remainingfee:{
        type:Number,
        require:true
    }
},{ timestamps: true });
const Account=new mongoose.model("Account",AccountSchema);
module.exports=Account;
