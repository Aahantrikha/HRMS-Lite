const express = require("express");
const router = express.Router();
const db = require("../db");

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post("/add", (req,res)=>{
  const {empId, name, email, department} = req.body;
  
  if(!empId || !name || !email || !department){
    return res.status(400).json({error:"All fields are required"});
  }
  
  // Validate email format
  if(!emailRegex.test(email)){
    return res.status(400).json({error:"Invalid email format"});
  }
  
  db.employees.findOne({empId}, (err, existing) => {
    if(err) {
      console.error("Error checking existing employee:", err);
      return res.status(500).json({error:"Database error"});
    }
    
    if(existing){
      return res.status(400).json({error:"Employee ID already exists"});
    }
    
    db.employees.insert({empId, name, email, department}, (err, newDoc) => {
      if(err) {
        console.error("Error inserting employee:", err);
        return res.status(500).json({error:"Failed to add employee"});
      }
      res.json({message:"Employee added successfully"});
    });
  });
});

router.get("/", (req,res)=>{
  db.employees.find({}, (err, docs) => {
    if(err) return res.status(500).json({error:"Failed to fetch employees"});
    res.json(docs);
  });
});

router.delete("/:id", (req,res)=>{
  db.employees.remove({_id: req.params.id}, {}, (err) => {
    if(err) return res.status(500).json({error:"Failed to delete employee"});
    res.json({message:"Employee deleted successfully"});
  });
});

module.exports = router;
