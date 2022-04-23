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
    }
});


module.exports=schema;