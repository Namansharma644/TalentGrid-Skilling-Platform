require("dotenv").config();
const express=require("express");
const connectDB=require("./src/config/db.init");

connectDB();

const PORT=process.env.PORT || 3000;

const app=express();

app.listen(PORT,()=>{
   console.log(`server is listen on PORT ${PORT}`)
});

module.exports=app;