const express=require("express");
const cookieParser=require("cookie-parser");
const authRouter=require("./routers/auth.route");


const app=express();

app.get("/",(req,res)=>{
    console.log("talendGrid backend is working fine !!");
});

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRouter);


module.exports=app;
