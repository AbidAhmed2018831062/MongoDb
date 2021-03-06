const express=require("express");
const mongoose=require("mongoose");
const toDo=require("./todo");
const user=require("./user");
mongoose.connect("mongodb://localhost/todo",{

}).then(()=>console.log("Connection successful")).catch(err=>console.log(err));

const app=express();

app.use(express.json());
require("dotenv").config();
app.use("/todo",toDo);
app.use("/user",user);

app.use((err,req,res,next)=>{
    if(err)
    {
        res.status(500).json({
            error:err
        })
    }
})

app.listen(3000,()=>{
    console.log("Server listening on 3000");
});