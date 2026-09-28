const express=require("express");
const cookieParser=require("cookie-parser");
const authRoute=require("./routers/auth.route");
const traineeRoute=require("./routers/trainee.route");
const districtRoute=require("./routers/district.route");
const districtOfficerRoute=require("./routers/districtOfficer.route");
const providerRoute=require("./routers/provider.route");
const providerUserRoute=require("./routers/providerUser.route");
const trainingProgramRoute = require(
    "./routers/trainingProgram.route"
);
const enrollmentRoute=require(
    "./routers/enrollment.route"
);


const app=express();

app.get("/",(req,res)=>{
    console.log("talendGrid backend is working fine !!");
});

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoute);
app.use("/api/trainee",traineeRoute);
app.use("/api/district",districtRoute);
app.use("/api/district-Officer",districtOfficerRoute);
app.use("/api/providers",providerRoute);
app.use("/api/provider-user",providerUserRoute);
app.use("/api/training-programs",trainingProgramRoute);
app.use("/api/enrollment",enrollmentRoute);

module.exports=app;
