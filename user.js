const express=require("express");
const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const userSchema=require("./userSchema");
const user=express.Router();

const user2=new mongoose.model("User",userSchema);

user.get("/",(req,res)=>{
 TODO.find().limit(1).select({
    date:0}).exec((err,data)=>{
        if(err)
        {
            res.status(500).json({
                error:"There was an error"
            })
        }
        else
        {
            res.status(200).json({
                result:data,
                message:"Successful"
            })   
        }
    });
});

 



user.post("/signup",async (req,res)=>{
    const hashp=await bcrypt.hash(req.body.password,10);
const t=new user2({
    name:req.body.name,
    username:req.body.username,
    password:hashp
});

 t.save((err)=>{
    if(err)
    {
        res.status(500).json({
            error:"There was an error"
        })
    }
    else
    {
        res.status(200).json({
            message:"Successful"
        })   
    }
});
});

user.post("/all",async(req,res)=>{
 TODO.insertMany(req.body,(err)=>{
    if(err)
    {
        res.status(500).json({
            error:"There was an error"
        })
    }
    else
    {
        res.status(200).json({
            message:"Successful"
        })   
    }
});
});

user.post("/login",async(req,res)=>{
 const user1= await user2.find({username:req.body.username}).clone().catch(err=>console.log(err));
 if(user1)
 {
     //console.log(user1);
     const valid=bcrypt.compare(req.body.password,user1[0].password);
     if(valid)
     {
       const all=jwt.sign({
           username:req.body.username,
           _id:user1[0]._id
       },process.env.JWT_SECRET,{expiresIn:"1hr"});
       res.status(200).json({status:all});
     }
     else
     {
        res.status(401).json({
            message:"Authentication failed"
        }) 
     }
 }
 else
 {
     res.status(401).json({
         message:"Authentication failed"
     })
 }
});

user.delete("/:id",(req,res)=>{
     TODO.deleteOne({_id:req.params.id},(err,data)=>{
    if(err)
    {
        res.status(500).json({
            error:"There was an error"
        })
    }
    else
    {
        res.status(200).json({
            result:data,
            message:"Successful"
        })   
    }
}).clone().catch(err=>console.log(err));
});

module.exports=user;