/*
 var fileSystem = require('fs');
 var file = "./ismini.db";
 var sqlite3 = require("sqlite3").verbose();
 var dbExists = fileSystem.existsSync(file);
 var db = new sqlite3.Database(file);
 */

var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var db;

if (process.env.ENV == 'Tests') {
    db = mongoose.connect('mongodb://localhost/isminiAPI_test');
}
else {
    db = mongoose.connect('mongodb://localhost/isminiAPI');
}

var Product = require('./models/productModel');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

productRouter = require('./routes/productRoutes')(Product);

app.use('/api/products', productRouter);
app.use('/api/customers', productRouter);

app.get('/', function (req, res) {
    res.send('Welcome to IsminiAPI');
});

app.listen(port, function () {
    console.log('Gulp is running on port ' + port);
});

module.exports = app;