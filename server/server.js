var express = require("express");
var app = express();


app.get("/",function (req,res){
    res.send("Hello world fico <3")
})

app.listen(3000);
console.log("Server login on port :3000")

const users = require('./routes/users');