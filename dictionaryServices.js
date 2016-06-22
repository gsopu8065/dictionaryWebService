/**
 * Created by srujangopu on 6/14/16.
 */
var app = require('./main.js');
var urban = require('urban');
var dbServices = require('./mongodb/dbServices.js')

app.get('/random', function (req, res) {
    urban.random().first(function (json) {
        json.source = "Urban Dictionary"
        res.send(json)
    });
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

app.get('/getEmail', function (req, res) {
    dbServices.getEmail(req.query.deviceId, res)
    //res.send("hello world")
});

app.post('/saveWord', function (req, res) {
    dbServices.saveWord(req.body, res)
});

app.get('/getSavedWords', function (req, res) {
    dbServices.getSavedWords(req.query.email, res)
});