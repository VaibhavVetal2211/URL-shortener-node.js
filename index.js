const express = require("express");
const path = require("path");
const cookieParser =  require("cookie-parser");


const {connectToMMongoDB,} = require("./connection");
const {restrictToLoggedinUserOnly,checkAuth} = require("./middlewares/auth");
const URL = require("./models/url");


const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");


const app = express();
const PORT = 8001;

connectToMMongoDB("mongodb://127.0.0.1:27017/short-url-app")
.then(()=>console.log("MongoDB connected"));

app.set("view engine", "ejs");
app.set("views",path.resolve("./views"));

app.use(express.json());  //middleware
app.use(express.urlencoded({extended:false})); //middleware
app.use(cookieParser());


app.use("/url" ,restrictToLoggedinUserOnly,urlRoute);
app.use("/" ,checkAuth,staticRoute);
app.use("/user" ,userRoute);

// app.get("/test",async (req,res)=>{
//     const allUrls = await URL.find({});
//     return res.render("home",{
//         urls: allUrls,
//     });
// });




app.listen(PORT,()=>{
    console.log(`Server started at PORT:${PORT}`);
});