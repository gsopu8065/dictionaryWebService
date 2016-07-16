/**
 * Created by srujangopu on 6/14/16.
 */
var app = require('./main.js');
var urban = require('urban');
var dbServices = require('./mongodb/dbServices.js');
var timexe = require('timexe');
var request = require('request');

app.get('/random', function (req, res) {

    if (req.query.id == 1) {
        urban.random().first(function (json) {
            json.source = "Urban Dictionary"
            res.send(json)
        });
    }
    else {
        dbServices.randomWord(req.query.id, res)
    }
});

app.get('/randomWords', function (req, res) {

    var result = []
    urban.random().first(function (json) {
        json.source = "Urban Dictionary"
        result.push(json)
        urban.random().first(function (json) {
            json.source = "Urban Dictionary"
            result.push(json)
            urban.random().first(function (json) {
                json.source = "Urban Dictionary"
                result.push(json)
                urban.random().first(function (json) {
                    json.source = "Urban Dictionary"
                    result.push(json)
                    res.send(result)
                });
            });
        });
    });
});

app.post('/signup', function (req, res) {
    dbServices.signup(req.body, res)
});

app.get('/checkDeviceId', function (req, res) {
    dbServices.checkDeviceId(req.query.deviceId, res)
});

app.get('/getEmail', function (req, res) {
    dbServices.getEmail(req.query.deviceId, res)
    //res.send("hello world")
});

app.post('/saveWord', function (req, res) {
    dbServices.saveWord(req.body, res)
});

app.post('/removeWord', function (req, res) {
    dbServices.removeWord(req.body, res)
});

app.get('/getSavedWords', function (req, res) {
    dbServices.getSavedWords(req.query.deviceId, res)
});

timexe("* * * * /1", function () {
    console.log(new Date() + "hello wolrd")
    request('https://dictionaryapp.herokuapp.com', function (error, response, body) {
        if (!error && response.statusCode == 200) {
        }
    })
});