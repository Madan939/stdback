const historyModel=require('../model/HistoryModel');
exports.getOnehistory=async(req,res)=>{
   // console.log(req.params.id)
    try{
        const account=await historyModel.find({accountId:req.params.id});
     //  console.log(account)
        res.send(account)
    } 
    catch{
        res.status(401).json({
            message:"not found"
        })
    }
}