const express = require('express');
const app = express();
const fetch = require('node-fetch');
const Twitter = require('twitter');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public/html'));
app.use(express.static(__dirname + '/public/css'));
app.use(express.static(__dirname + '/public/js'));
app.set("view engine", "ejs");

// File with API keys in it
const config = require('./config.js');


require('./public/js/reddit')(app); 


// All routes work so far
app.get('/', (req, res) => { 
    res.render('landingPage');
});

app.post('/twitter-search', (req,res) => {
    const username = req.body.user_search;
    makeTwitterRequest(username);
    res.redirect('/');
})

app.post('/personal-text', (req,res) => {
    const usertext = req.body.usertext;
    res.send(usertext);
});


// ******* HELPER FUNCTIONS **********

// Twitter related functions
var twitterClient = new Twitter(config.twitterCred);
function makeTwitterRequest(username) {
    var tweetParams = {
        tweet_mode: 'extended', 
        screen_name: username,
        count: 5, 
        include_rts: false
    };

    twitterClient.get('statuses/user_timeline', tweetParams, (error, tweets, response) => {
        if(error) throw error;
        for(let i = 0; i < tweets.length; ++i) {
            console.log(tweets[i].full_text);  // The favorites.
        }
    });
}

// Start the server on port 8080
app.listen(8080, (req,res) => {
    console.log("Server started, port 8080");
});