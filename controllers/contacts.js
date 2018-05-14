var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
var mongoose = require("mongoose");
var ContactsModel = require("../models/contacts");
var UsersModel = require("../models/users");
var validator = require('validator');


let userId;
var authorizedMid = (request,response,next)=>{
    UsersModel.checkUserAuthorization(request.body.authorization, request.body.deviceToken
        , request.body.fingerPrint,function(err,data){
            if(!err){
                if(data == null)
                {
                    response.json("Unauthorized User")
                }
                else{
                    userId = data._id
                    next();
                }
            }
            else{
                response.json("An error occure while finding user please try again")
            }

    });
}

// Add Contact Router
router.post("/addContact",bodyParser.json(),authorizedMid,function(request,response)
{
    if(validator.isEmail(request.body.email) && validator.isAlpha(request.body.firstname) &&
        validator.isAlpha(request.body.lastname))
    {
        ContactsModel.addNewContact({
            firstname:request.body.firstname,
            lastname:request.body.lastname,
            email:request.body.email,
            mobile:request.body.mobile,
            userId:userId,
        },function(err,doc){
        if(!err)
        {
            let msg = {
                success: true,
                statusCode: response.statusCode,
                message: "contact added successfully",
                data: doc,
            }
            response.json(msg);
        }
        else
            response.json("An error occure while saving contact please try again");
        });
    }
    else{
            response.json("Invalid Name or Email");
    }
});

// get all contacts
router.post("/getList",bodyParser.json(),authorizedMid,function(request,response,data)
{
        ContactsModel.getAllList(userId,request.body.pageNum, 
            function(err,contacts){
                let msg = {
                    success: true,
                    statusCode: response.statusCode,
                    data: contacts,
                }   
                response.json(msg);
        });         
});

// get Recent contacts
router.post("/getRecentList",bodyParser.json(),authorizedMid,function(request,response)
{
        ContactsModel.getRecentList(userId, function(err,data){
                let msg = {
                    success: true,
                    statusCode: response.statusCode,
                    data: data,
                }   
                response.json(msg);
        });
});

module.exports = router;
