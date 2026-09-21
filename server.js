require("dotenv").config();
const app=require("./src/app.js");
const connectToDB=require("./src/config/db.init.js");

connectToDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`server is listening on ${PORT}`);
});