const AccountModel=require('../model/AccountModel');
const historyModel=require('../model/HistoryModel');
exports.addAccountInfo=async(req,res)=>{
   // console.log(req.body)
    try{
        const newAccount=new AccountModel({
            studentId:req.body.studentId,
            courseId:req.body.courseId,
            name:req.body.name,
            totalAmount:req.body.totalAmount,
            paidfee:req.body.paidfee,
            remainingfee:req.body.remainingfee
        })   
        await newAccount.save();
        const accounthistory=new historyModel({
            accountId:newAccount._id,
            studentId:req.body.studentId,
            courseId:req.body.courseId,
            name:req.body.name,
            totalAmount:req.body.totalAmount,
            paidAmount:req.body.paidfee,
            remainingAmount:req.body.remainingfee,
            date:req.body.date
        })   
        await accounthistory.save()
        res.status(200).json({
            message: 'Amount paid successfully'
        })
    }
    catch{
        console.log("failed")
        res.status(401).json({
            message:"Failed to paid amount"
        })
    }
}
exports.getAccount=async(req,res)=>{
    try{
        account=await AccountModel.find();
        res.send(account);
    }
    catch(err){
        console.log(err)
        res.status(401).json({
            message:"Failed to found account"
        })  
    }
}
exports.getOneAccount=async(req,res)=>{
    try{
        account=await AccountModel.findById(req.params.id);
        res.send(account);
    }
    catch(err){
        console.log(err)
        res.status(401).json({
            message:"Failed to found account"
        })  
    }
}
exports.updateAccount=async(req,res)=>{
    //console.log(req.body)
    try{
        const account=await AccountModel.findById(req.body._id)
        if(!account){
            res.status(401).json({
                message:"acocunt not found"
            })
        }
        let{_id,paidfee,remainingfee}=req.body;
        await AccountModel.findByIdAndUpdate(_id,{paidfee,remainingfee});
        const accounthistory=new historyModel({
            accountId:req.body._id,
            studentId:req.body.studentId,
            courseId:req.body.courseId,
            totalAmount:req.body.totalAmount,
            paidAmount:req.body.paidfee,
            remainingAmount:req.body.remainingfee,
            date:req.body.date
        })   
        await accounthistory.save()
        res.status(200).json({
            message:"Amount paid successfully"
        })
       // console.log(account)
    }
    catch{
        res.status(401).json({
            message:"acocunt not found"
        })
    }
}
exports.searchAccount=async(req,res)=>{
   // console.log(req.body)
    const name = req.body.account;
    try {
        const account = await AccountModel.find({ name: { $regex: new RegExp(name, 'i') } })
        if(!account.length>0){
           console.log("not found")
            res.status(401).json({
                message: "Student not found"
            })
           return false;
        }
       //console.log(account)
        res.send(account)
    }
    catch {
        res.status(401).json({
            message: "Student not found"
        })
    }
}