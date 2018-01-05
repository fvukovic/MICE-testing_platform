var mongodb = require('mongodb');
var config = require("./config");


module.exports.init = function (callback) {
  var server = new mongodb.Server(config.mongo_ip_address, config.mongo_port, {});
  new mongodb.Db(config.database, server, {w: 1}).open(function (error, client) {
    //export the client and maybe some collections as a shortcut
    module.exports.client = client; 
    module.exports.conferencemenu = client.collection("conferencemenu"); 
    module.exports.product = client.collection("product"); 
    module.exports.conference_user = client.collection("conference_user"); 
    callback(error);
  });
};