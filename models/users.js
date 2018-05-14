var mongoose = require("mongoose");

// ORM Mapping ...
var Schema = mongoose.Schema;

var users = new Schema({
	authorization:String,
	deviceToken:String,
	fingerPrint:String,
  	name:String,
});

// Register ...
mongoose.model("users",users);

let UsersModel = {}
UsersModel.model = mongoose.model("users");


UsersModel.addNewUser = (userData, callbackFn)=>{
    let user = new UsersModel.model(userData);
    user.save((err, doc)=>{
        callbackFn(err, doc);
    });
}

UsersModel.checkUserAuthorization = (authorization, deviceToken, fingerPrint ,callbackFn)=>{
    UsersModel.model.findOne({authorization:authorization, deviceToken:deviceToken
            , fingerPrint:fingerPrint},(err,doc)=>{ 
        callbackFn(err, doc);
      });
}

module.exports = UsersModel;
