const express=require("express");
const mongoose=require("mongoose");
const schema=require("./schema");
const toDo=express.Router();

const TODO=new mongoose.model("ToDo",schema);

toDo.get("/",async(req,res)=>{
await TODO.find().limit(1).select({
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

toDo.get("/:id",async(req,res)=>{
    await TODO.find({_id:req.params.id}).limit(1).select({
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

toDo.post("/",async(req,res)=>{
const t=new TODO(req.body);

await t.save((err)=>{
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

toDo.post("/all",async(req,res)=>{
await TODO.insertMany(req.body,(err)=>{
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

toDo.put("/:id",async(req,res)=>{
await TODO.updateOne(
    {_id:req.params.id},
    {
    $set:{
        status:"inactive",
    }
}
,(err)=>{
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

toDo.delete("/:id",async(req,res)=>{
await TODO.deleteOne({_id:req.params.id},(err,data)=>{
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

module.exports=toDo;