/**
 * Created by srujangopu on 3/8/16.
 */
var express = require('express');
var bodyParser = require('body-parser')

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.listen(9050, function () {
    console.log("Example app listening at http://localhost:%s", 9050)
});

module.exports = app;