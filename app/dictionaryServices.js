/**
 * Created by srujangopu on 6/14/16.
 */
var app = require('./main.js')
var urban = require('urban');

app.get('/random', function (req, res) {
    urban.random().first(function(json) {
        res.send(json)
    });
});