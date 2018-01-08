
var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var app = express();
var config = require("./config");
var mongodb = require("mongodb")
var db = require("./db");
var passwordHash = require('password-hash');
var cors = require('cors');
var router = express.Router();

app.use(cors({ origin: 'http://localhost:8080' }))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));


//Baza
db.init(function (error) {
    if (error)
        throw error;

    app.listen(3001);
});

//node server
app.listen(config.port, function (err) {


    if (err) {
        console.log(err);
    } else {
        console.log("Listening on port " + config.port)
    }
})



//rute treba odvojit u fajlove!!
app.post("/menu", function (req, res, next) {
    var response = []; 
    db.conference.findOne({"web_address": req.body.conference_name }, function (err, result) {
        if (err) {
            console.log(err);
        } else {  
            if(result==null){
                res.send({"status":0}); 
                return;
            }
            db.conferencemenu.find({"conference_id": result._id}).toArray(function (err, result) {
                if (err) {
                    console.log(err);
                } else { 
                        res.send(result[0]); 
                }
            })
        }
    })

  
});

app.post("/conference", function (req, res, next) {
    var response = []; 
    db.conference.findOne({"web_address": req.body.conference_name }, function (err, result) {
        if (err) {
            console.log(err);
        } else {  
            res.send(result);
        }

  
});

   
});

app.post("/register", function (req, res, next) {

    var request = req.body;
    var succes_msg = {
        username: 1,
        email: 1,
        status: 1,
    };

    db.conference_user.findOne({ "username": req.body.username }, function (err, result) {
        if (err) throw err;
        console.log(req.body.username);
        if (result == null) {
            console.log("ne postoji");
        } else {
            console.log("postoji");
            succes_msg.username = 0;
            succes_msg.status = 0;
        }
    });

    db.conference_user.findOne({ "email": req.body.email }, function (err, result) {
        if (err) throw err;
        if (result == null) {
            console.log("ne postoji");
        } else {
            console.log("postoji");
            succes_msg.status = 0;
            succes_msg.email = 0;
        }
        res.send(succes_msg);
        if (succes_msg.status == 1) {
            request.password = passwordHash.generate(req.body.password)
            db.conference_user.insertOne(request, function (err, res) {
                if (err) throw err;
                console.log("1 document inserted");
            });
        }
    });



});
 
app.get("/products", function (req, res, next) {
    var response = [];
    db.product.find({}).toArray(function (err, result) {
        db.tax.find({}).toArray(function (err2, result2) {

            console.log("OVOO:"+result2.length);
                for(var x=0;x<result.length;x++){
                    for(var y=0;y<result2.length;y++){ 
                        console.log(result[x].tax  +"    "+result2[y]["_id"]);
                        console.log(result[x].tax==result2[y]["_id"]);
                        if(result[x].tax.equals(result2[y]["_id"])){
                             response.push({
                                 "product":result[x],
                                 "tax":result2[y].name,
                             });
                        }    
                    }
                    
                }
                res.send(response);   
        });
       
        if (err) {
            console.log(err);
        } else {
            for (var x = 0; x < result.length; x++) {


            }
        }
    })
});



app.post("/login", function (req, res, next) {
    var succes_msg = {
        username: 1,
        password: 1,
        status: 0,
    };

    db.conference_user.findOne({ "username": req.body.username }, function (err, result) {
        if (err) throw err;
        console.log(req.body.username);
        if (result == null) {
            console.log("ne postoji");
            succes_msg.username = 0;
            res.send(succes_msg);
        } else {
            if (passwordHash.verify(req.body.password, result.password)) {
                succes_msg.status = 1;
                res.send(succes_msg);
            } else {
                succes_msg.password = 0;
                res.send(succes_msg);
            }
        }
    });

});





