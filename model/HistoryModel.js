const mongoose=require('mongoose');
const historySchema=new mongoose.Schema({
    accountId:{
        type:String,
        require:true,
    },
    studentId:{
        type:String,
        require:true,
    },
    courseId:{
        type:String,
        require:true,
    },
    totalAmount:{
        type:Number,
        require:true 
    },
    paidAmount:{
        type:Number,
        require:true
    },
    remainingAmount:{
        type:Number,
        require:true
    },
    date:{
        type:String,require:true
    }
},{ timestamps: true });
const History=new mongoose.model("History",historySchema);
module.exports=History;