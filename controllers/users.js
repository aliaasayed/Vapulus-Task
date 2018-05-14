var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
var mongoose = require("mongoose");
var UsersModel = require("../models/users");


// Add User Router
router.post("/addUser",bodyParser.json(),function(request,response)
{
        UsersModel.addNewUser({
            name:request.body.name,
            authorization:request.body.authorization,
            deviceToken:request.body.deviceToken,
            fingerPrint:request.body.fingerPrint,
        },function(err,doc){
        if(!err)
        {
            let msg = {
                success: true,
                statusCode: response.statusCode,
                message: "user added successfully",
                data: doc,
            }
            response.json(msg);
        }
        else
            response.json("An error occure while saving user please try again");
        });
});


module.exports = router;
