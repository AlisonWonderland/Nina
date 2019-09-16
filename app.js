const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public/html'));
app.use(express.static(__dirname + '/public/css'));
app.use(express.static(__dirname + '/public/js'));
app.use(express.static(__dirname + '/public/images'));
app.set("view engine", "ejs");

// File with API keys in it
const config = require('./config.js');

// Load all the routes
require('./router')(app); 

// Start the server on port 8080
app.listen(8080, (req,res) => {
    console.log("Server started, port 8080");
});