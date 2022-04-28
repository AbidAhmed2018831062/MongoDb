const jwt=require("jsonwebtoken");

const checkToken=((req,res,next)=>{
    try{
        const decode=jwt.decode(req.headers.authentication.split(" ")[1],process.env.JWT_SECRET);
        req.username=decode.username;
        req._id=decode._id;
        console.log("All Okay");
        next();

    }
    catch(e)
    {
        console.log(err);
        next(e);
    }
});

module.exports=checkToken;