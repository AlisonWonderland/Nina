var express = require('express');
var app = express();
var fetch = require('node-fetch');
var Twitter = require('twitter');

// File with API keys in it
var config = require('./config.js');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public/html'));
app.use(express.static(__dirname + '/public/css'));
app.use(express.static(__dirname + '/public/js'));
app.set("view engine", "ejs");


var client = new Twitter(config);

client.get('statuses/user_timeline', {tweet_mode: 'extended', screen_name: 'realDonaldTrump',count: 5, include_rts: false},function(error, tweets, response) {
    if(error) throw error;
    console.log(tweets[0].full_text);  // The favorites.
});

app.get('/', function(req, res) { 
    res.render('landingPage');
});

app.post('/reddit-search', function(req, res) {
    var username = req.body.user_search;
    // makeRedditRequest(username);
    res.send(req.body.user_search);
    // res.redirect('/');
})

app.post('/twitter-search', function(req, res) {
    var username = req.body.user_search;
    // makeTwitterRequest(username);
    res.send(req.body.user_search);
})

app.post('/personal-text', function(req, res) {
    var usertext = req.body.usertext;
    console.log("hi");
    res.send();
});

// Start the server on port 8080
app.listen(8080, function(req, res) {
    console.log("Server started, port 8080");
});