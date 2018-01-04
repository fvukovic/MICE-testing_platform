
var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var app = express();
var config = require("./config");
var mongodb = require("mongodb")
var db;
var passwordHash = require('password-hash');
var cors = require('cors');
var router = express.Router();

app.use(cors({ origin: 'http://localhost:8080' }))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));

var url = "mongodb://localhost:27017/mice"
var MongoClient = mongodb.MongoClient;
MongoClient.connect(url, function (err, dba) {
    if (err) {
        console.log(err);
    }
    else {
        db = dba;
        console.log("Connected")
    }
});



app.get("/menu", function (req, res, next) {
    var response = [];
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');


    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    var collection = db.collection("conferencemenu");
    collection.find({}).toArray(function (err, result) {
        if (err) {
            console.log(err);
        } else {
            for (var x = 0; x < result.length; x++) {
                (res.send(result[x]));

            }
        }
    })

    app.post("/register", function (req, res, next) {
        var request = req.body;

        var succes_msg = {
            username: 1,
            email: 1,
            status: 1,
        };

        db.collection("user").findOne({ "username": req.body.username }, function (err, result) {
            if (err) throw err;
            console.log(req.body.username);
            if (result == null) {
                console.log("ne postoji");
            } else {
                console.log("postoji");
                succes_msg.username = 1;
                succes_msg.status = 0;
            }
        });

        db.collection("user").findOne({ "email": req.body.email }, function (err, result) {
            console.log(req.body.email);

            if (err) throw err;
            if (result == null) {
                console.log("ne postoji");
            } else {
                console.log("postoji");
                succes_msg.status = 0;
                succes_msg.email = 1;
            }

        });
        res.send(succes_msg);
        if (succes_msg.status == 0) {
            request.password = passwordHash.generate(req.body.password)
            db.collection("user").insertOne(request, function (err, res) {
                if (err) throw err;
                console.log("1 document inserted");
            });
        }

    });

});

app.post("/login", function (req, res, next) {
    var succes_msg = {
        username: 1,
        password: 1,
        status: 1,
    };
    db.collection("user").findOne({ "username": req.body.username }, function (err, result) {
        if (err) throw err;
        console.log(req.body.username);
        if (result == null) {
            console.log("ne postoji");
            succes_msg.username = 0;
            succes_msg.status = 0;
        } else {
            console.log(result.password + "      " + passwordHash.generate(req.body.password));
            if (result.password == passwordHash.generate(req.body.password)) {
                succes_msg.status = 1;
            }
        }
    });

});





app.listen(config.port, function (err) {


    if (err) {
        console.log(err);
    } else {
        console.log("Listening on port " + config.port)
    }
}) 