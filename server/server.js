


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
var mongo = require('mongodb');

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
    var response = {
        "menu": "",
        "conference": "",
    };
    db.conference.findOne({ "web_address": req.body.conference_name }, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            if (result == null) {
                res.send({ "status": 0 });

                return;
            }
            response.conference = result;
            db.conferencemenu.find({ "conference_id": result._id }).toArray(function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    response.menu = result[0].menu;
                    res.send(response);
                }
            })
        }
    })


});

app.post("/conference", function (req, res, next) {
    var response = [];
    db.conference.findOne({ "web_address": req.body.conference_name }, function (err, result) {
        console.log(req.body.conference_name);
        if (err) {
            console.log(err);
        } else {
            res.send(result);
            console.log(result);
        }

    });


});

app.post("/register", function (req, resM, next) {

    var request = req.body.reg;
    var succes_msg = {
        username: 1,
        email: 1,
        status: 1,
    };

    db.conference_user.findOne({ "username": req.body.reg.username }, function (err, result) {
        if (err) throw err;
        if (result == null) {
            console.log("ne postoji");
        } else {
            console.log("postoji");
            succes_msg.username = 0;
            succes_msg.status = 0;
            resM.send(succes_msg);
            return;
        }
    });
    db.conference_user.findOne({ "email": req.body.reg.email }, function (err, result) {
        if (err) throw err;
        if (result == null) {
            console.log("ne postoji");
        } else {
            console.log("postoji");
            succes_msg.status = 0;
            succes_msg.email = 0;
            resM.send(succes_msg);
            return;
        }

        if (succes_msg.status == 1) {
            request.password = passwordHash.generate(req.body.reg.password)
            db.conference_user.insertOne(request, function (err, res) {
                if (err) throw err;

                db.conference_users_rel.insertOne({ "user_id": res.ops[0]._id, "conference_id": req.body.id }, function (err, res2) {
                    if (err) throw err;
                    console.log("1 document inserted" + JSON.stringify(res2.ops[0]));
                    resM.send(succes_msg);

                });


            });
        }
    });



});

app.post("/profile", function (req, res, next) {
    var response = {
        user: [],
        conference: []
    };
    console.log(req.body.conference_name);
    db.conference_user.findOne({ "username": req.body.username }, function (err, result) {
        response.user = result;

        db.conference.findOne({ "web_address": req.body.conference_name }, function (err, result2) {
            console.log("POSTOOJI");
            response.conference = result2;
            res.send(response);
        });

    });
});


app.post("/products", function (req, res, next) {
    var response = [{
        conference_id: [],
        suppro: [],
        product: [],
        conference: [],
    }];
    var conf = [];
    var o_id = new mongo.ObjectID(req.body.id_conference);
    db.conference.findOne({ "_id": o_id }, function (err, result) {
        console.error("OVAOOOOOVOOO:" + result);
        if (err) {
            console.log(err);
        } else {
            conf = result;
        }

    });



    db.conferenceline.find({ "conference_id": o_id }).toArray(function (err, result) {

        db.supplierproduct.find({}).toArray(function (err, result2) {

            db.product.find({}).toArray(function (err, result3) {
                for (var x = 0; x < result.length; x++) {
                    for (var y = 0; y < result2.length; y++) {
                        if (result[x].supplier_product_id.equals(result2[y]._id)) {
                            for (var z = 0; z < result3.length; z++) {
                                if (result2[y].product.equals(result3[z]._id)) {

                                    for (var v = 0; v < conf.user_additional_setup.length; v++) {
                                        console.log(result[x].user_data_additional_setup);
                                        for (var b = 0; b < result[x].user_data_additional_setup.length; b++) {
                                            if (conf.user_additional_setup[v]._id.equals(result[x].user_data_additional_setup[b].label_id)) {
                                                result[x].user_data_additional_setup[b].name = conf.user_additional_setup[v].label;
                                            }
                                        }
                                    }
                                    response.push({
                                        product: result3[z],
                                        suppro: result2[y],
                                        conference: result[x],
                                        conference_id: conf,
                                    });
                                }
                            }
                        }

                    }
                }
                response.shift();
                response.pop();

                res.send(response);
            });
        });

    });
});

app.post("/registerProduct", function (req, res, next) { 
   
});

app.post("/login", function (req, res, next) {
    var succes_msg = {
        username: 1,
        password: 1,
        status: 0,
    };

    db.conference_users_rel.find({ "conference_id": req.body.id }).toArray(function (err, result) {

        db.conference_user.find({}).toArray(function (err, result2) {
            for (var x = 0; x < result.length; x++) {
                for (var y = 0; y < result2.length; y++) {
                    if (result[x].user_id.equals(result2[y]._id)) {
                        if (err) throw err;
                        if (req.body.username.toString().trim() === (result2[y].username)) {
                            if (passwordHash.verify(req.body.password, result2[y].password)) {
                                succes_msg.status = 1;
                                succes_msg.username = 1;
                                succes_msg.password = 1;
                                res.send(succes_msg);
                                return;
                            } else {
                                succes_msg.password = 0;

                            }
                        } else {
                            succes_msg.username = 0;

                        }
                    }
                }
            }
            res.send(succes_msg);
        });

    });

});





