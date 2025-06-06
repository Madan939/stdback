const jwt=require('jsonwebtoken');
const UserModel=require('../model/UserModel');
const protect=async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token=req.headers.authorization.split(' ')[1];
            const decode=jwt.verify(token,process.env.JWT_TOKEN);
            req.user=await UserModel.findById(decode._id);
            next();
        }
        catch(err){
            console.log(err)
            res.status(401).json({
                message:"not authorized,no token"
            })
        }
        if(!token){
            res.status(401).json({
                message:"token not found"
            })
        }
    }
}
module.exports=protect