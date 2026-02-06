const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/mark", (req,res)=>{
  const {empId,date,status} = req.body;
  
  if(!empId || !date || !status){
    return res.status(400).json({error:"All fields required"});
  }
  
  db.attendance.insert({empId, date, status}, (err, newDoc) => {
    if(err) return res.status(500).json(err);
    res.json({message:"Attendance marked"});
  });
});

router.get("/:empId", (req,res)=>{
  db.attendance.find({empId: req.params.empId}, (err, docs) => {
    if(err) return res.status(500).json(err);
    res.json(docs);
  });
});

module.exports = router;
