const cookieParser = require("cookie-parser");
const app=require("../server.js");

app.use(express.json());
app.use(cookieParser());
