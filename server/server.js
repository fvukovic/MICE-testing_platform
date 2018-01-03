 
var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var app = express();
var config = require("./config"); 
var mongodb = require("mongodb")  
var db;

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(morgan("dev")); 

var url = "mongodb://localhost:27017/mice"
  
var MongoClient = mongodb.MongoClient;
MongoClient.connect(url,function(err,dba){
    if(err){
        console.log(err);
    }
    else{
        db=dba;
        console.log("Connected")  
         }
});


app.get("/menu",function(req,res,next){ 
    var response = [];  

    var collection  = db.collection("conferencemenu");
  collection.find({}).toArray(function(err,result){
    if(err){
       console.log(err);
    }else{
           for(var x=0;x<result.length;x++){
                (JSON.stringify(result[x]));
              
           }
    }
})


  });
  

 

 app.listen(config.port,function(err){
     if(err){
         console.log(err);
     }else{
        console.log("Listening on port "+config.port)
     }
 }) 
//const users = require('./routes/users');

//app.use('/users', users);