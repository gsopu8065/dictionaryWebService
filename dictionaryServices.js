/**
 * Created by srujangopu on 6/14/16.
 */
var app = require('./main.js')
var urban = require('urban');

app.get('/randomWords', function (req, res) {
    var list =[]
    urban.random().first(function(json){
        json.source = "Urban Dictionary"
        list.push(json)
        urban.random().first(function(json){
            json.source = "Urban Dictionary"
            list.push(json)
            urban.random().first(function(json){
                json.source = "Urban Dictionary"
                list.push(json)
                res.send(list)
            })
        })
    })
});

app.get('/random', function (req, res) {
    urban.random().first(function(json) {
        json.source = "Urban Dictionary"
        res.send(json)
    });
});