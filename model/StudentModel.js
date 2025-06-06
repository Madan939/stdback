const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    grade: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    dob: {
        type: String,
        require: true,
    },
    gender: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        require: true,
    },
    course: {
        type: String,
        require: true,
    },
    advancefee:{
        type:Number,
        require:true
    },
    address: {
        type: Array,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
}, { timestamps: true });
module.exports=mongoose.model('student',studentSchema);