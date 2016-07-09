/**
 * Created by srujangopu on 6/19/16.
 */
var mongodb = require('mongodb');
var mongoDbConnection = require('./connection.js');

var files = ["verbs", "emotions", "adjectives", "descriptivewords"]

var dbservice = {

    randomWord: function(dbNumber, res){

        mongoDbConnection(function (databaseConnection) {
            databaseConnection.collection(files[dbNumber-2], function (error, collection) {
                collection.find().count(function(error, numOfDocs) {
                    var n = numOfDocs;
                    var r = Math.random() * (n - 0) + 0;
                    collection.find({}).skip(r).next(function (err, doc) {
                        doc.source = "Words Swipe"
                        res.send(doc)
                    })
                });
            });
        });
    },

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
                collection.update({_id: body._id}, {$addToSet: {words: {$each: body.word}}}, function (err, records) {
                    res.send(records)
                })
            });
        });
    },

    removeWord: function(body, res){
        mongoDbConnection(function (databaseConnection) {
            databaseConnection.collection('dictionary', function (error, collection) {
                console.log("srujan")
                collection.findOneAndUpdate({_id: body._id}, {$pull: {words:  body.word}}, function (err, records) {
                    res.send(records)
                })
            });
        });
    },

    getSavedWords : function(deviceId, res){
        mongoDbConnection(function (databaseConnection) {
            databaseConnection.collection('dictionary', function (error, collection) {
                collection.find({_id: deviceId}).next(function (err, doc) {
                    res.send(doc)
                })
            });
        });
    }
}

module.exports = dbservice;