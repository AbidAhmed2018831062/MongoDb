const express=require("express");
const mongoose=require("mongoose");

const schema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    des:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['active','inactive'],
    },
    date:{
        type:Date,
        default:Date.now,
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }
});

schema.methods={
    findActive: ()=>{
        return mongoose.model("ToDo").find({status:"active"}).clone().catch(err=>console.log(err));
    },
}

schema.statics={
    findInActive:function()
    {
        return this.find({status:"inactive"});
    }
}

schema.query={
    byLeaugue: function()
    {
        return this.find({title:"Premier League"})
    }
}


module.exports=schema;