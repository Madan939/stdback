const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const { verify } = require('jsonwebtoken');
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:String,
        default:"User"
    },
    verified:{
        type:Boolean,
        require:true
    }
},{timestamps:true});
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})
UserSchema.methods.matchPassword = async function (enterpassword) {
    //console.log("enter password", enterpassword)
    let match = await bcrypt.compare(enterpassword, this.password);
    // console.log(match)
    return match;
}
const User=new mongoose.model('User',UserSchema);
module.exports=User;