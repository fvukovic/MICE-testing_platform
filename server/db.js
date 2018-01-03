
var config = require("./config"); 
var mongodb = require("mongodb")  
var url = "mongodb://localhost:27017/mice"

var MongoClient = mongodb.MongoClient;
MongoClient.connect(url,function(err,db){
    if(err){
        console.log(err);
    }
    else{
        module.exports= db;
    }

});

