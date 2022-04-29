const express=require("express");
const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    todo:[
        {
            type:mongoose.Types.ObjectId,
            ref:"ToDo"
        }
    ],
    date:{
        type:Date,
        default:Date.now,
    }
});

module.exports=userSchema;