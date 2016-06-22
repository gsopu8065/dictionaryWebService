/**
 * Created by srujangopu on 6/19/16.
 */
var mongodb = require('mongodb');
var mongoDbConnection = require('./connection.js');

var dbservice = {

    signup: function(body, res){

        mongoDbConnection(function (databaseConnection) {
            databaseConnection.collection('dictionary', function (error, collection) {
                collection.insert(body, function (err, records) {
                    res.send(records)
                })
            });
        });
    },

    getEmail: function(deviceId, res){

        mongoDbConnection(function (databaseConnection) {
            databaseConnection.collection('dictionary', function (error, collection) {
                collection.find({_id: deviceId}).toArray(function(err, dbres) {
                    res.jsonp(dbres);
                });
            });
        });

    },

    saveWord: function(body, res){
        mongoDbConnection(function (databaseConnection) {
            databaseConnection.collection('dictionary', function (error, collection) {
                collection.update({email: body.email}, {$push: {words: {$each: body}}}, function (err, records) {
                    res.send(records)
                })
            });
        });
    },

    getSavedWords : function(email, res){
        mongoDbConnection(function (databaseConnection) {
            databaseConnection.collection('dictionary', function (error, collection) {
                collection.find({email: email}).next(function (err, doc) {
                    res.send(doc)
                })
            });
        });
    }
}

module.exports = dbservice;