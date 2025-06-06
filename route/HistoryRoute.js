const express=require('express');
const historyController=require('../controller/HistoryController');
const router=express.Router();
router.get("/getOnehistory/:id",historyController.getOnehistory);
module.exports=router;