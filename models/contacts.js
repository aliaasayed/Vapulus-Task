var mongoose = require("mongoose");
var mongoosePaginate= require("mongoose-paginate");
// ORM Mapping ...
var Schema = mongoose.Schema;

var contacts = new Schema({
  firstname:{
    type:String
  },
  lastname:{
    type:String
  },
  email:{
    type:String
  },
  mobile:{
    type:String
  },
  time : {
    type : Date,
    default: Date.now
  },
  userId:{
    type:Schema.Types.ObjectId,
    ref:"users"
  }
})


contacts.plugin(mongoosePaginate);

// Register ...
mongoose.model("contacts",contacts);

let ContactsModel = {}
ContactsModel.model = mongoose.model("contacts");

ContactsModel.addNewContact = (contactData, callbackFn)=>{
    let contact = new ContactsModel.model(contactData);
    contact.save((err, doc)=>{
        callbackFn(err, doc);
    });
}

ContactsModel.getAllList = (userId, pageNum, callbackFn)=>{
    ContactsModel.model.paginate({userId:userId},{page:pageNum ,limit:5},
      (err,doc)=>{ 
        callbackFn(err, doc);
      });
}

ContactsModel.getRecentList = (userId, callbackFn)=>{
    ContactsModel.model.find({userId:userId},{},{sort:{ time: -1 }, limit: 5},(err,doc)=>{ 
        callbackFn(err, doc);
      });
}

module.exports = ContactsModel;
