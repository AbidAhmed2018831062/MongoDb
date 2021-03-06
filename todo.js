const express=require("express");
const mongoose=require("mongoose");
const schema=require("./schema");
const checkToken=require("./checkToken");
const toDo=express.Router();

const TODO=new mongoose.model("ToDo",schema);

toDo.get("/",checkToken,(req,res)=>{
 TODO.find().populate("user").limit(1).select({
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
toDo.get("/active", async (req,res)=>{
    const t=new TODO();
   const data= await t.findActive();
   res.status(200).json({
    message:"Success",
    data:data
})
  
 });
 toDo.get("/inactive", async (req,res)=>{
   
   const data= await TODO.findInActive().byLeaugue();
   res.status(200).json({
    message:"Success",
    data:data
 });
 });
 
toDo.get("/:id",(req,res)=>{
    //select, limit, exec all are query helpers which are built in
     TODO.find({_id:req.params.id}).limit(1).select({
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


toDo.post("/",checkToken,async (req,res)=>{
console.log(req._id);

const t=new TODO({
    ...req.body,
   user: req._id
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
     mongoose.model("User").updateOne({_id:req._id},
            {
                $push:{
                    todo:t._id
                }
            },(err)=>{
                if(err)
                {
                    res.status(500).json({
                        error:"There was an error"
                    })
                }
                else{
                res.status(200).json({
                    message:"Successful"
                }) 
            }
            })  
    }
});
});

toDo.post("/all",async(req,res)=>{
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

toDo.put("/:id",(req,res)=>{
 TODO.updateOne(
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

toDo.delete("/:id",(req,res)=>{
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

module.exports=toDo;