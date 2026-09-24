const express=require("express");
const cookieParser=require("cookie-parser");
const authRoute=require("./routers/auth.route");
const traineeRoute=require("./routers/trainee.route");
const districtRoute=require("./routers/district.route")


const app=express();

app.get("/",(req,res)=>{
    console.log("talendGrid backend is working fine !!");
});

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoute);
app.use("/api/trainee",traineeRoute);
app.use("/api/district",districtRoute);


module.exports=app;
