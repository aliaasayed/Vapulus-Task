var express = require("express");
var server = express();
var fs = require("fs");
var path = require('path');
var bodyParser = require("body-parser");
var mongoose = require("mongoose");


server.use(function(req,resp,next){
  resp.header("Access-Control-Allow-Origin","*");
  resp.header("Access-Control-Allow-Headers","Content-Type");
  resp.header("Access-Control-Allow-Methods","GET,POST,PUT,DELETE");
  next();
});

mongoose.connect("mongodb://localhost:27017/ContactList");


fs.readdirSync(path.join(__dirname,"models")).forEach(function(filename){
    require('./models/'+filename);
});


var contactRouter = require("./controllers/contacts");
server.use("/contacts",contactRouter);

var userRouter = require("./controllers/users");
server.use("/users",userRouter);


server.listen(9090,function(){
  console.log("Starting listen...");
});
