const express = require('express');
const bodyParser = require("body-parser");
const organiserRoutes = require("./routes/organisers");
const userRoutes = require("./routes/user");
const queryRoutes = require("./routes/query");
const mailerRoutes = require("./routes/mailer");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept,Authorization");
    res.setHeader("Access-Control-Allow-Methods","GET,POST,PATCH,PUT,DELETE,OPTIONS");
    next();
});
 
 app.use("/api/organisers",organiserRoutes);
 app.use("/api/user",userRoutes);
 app.use("/api/query",queryRoutes);
 app.use("/api/mailer",mailerRoutes);

 module.exports = app;