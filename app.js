const express = require('express');
const app = express();
const fetch = require('node-fetch');
const Twitter = require('twitter');
const snoowrap = require('snoowrap');
const PersonalityInsightsV3 = require('ibm-watson/personality-insights/v3');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public/html'));
app.use(express.static(__dirname + '/public/css'));
app.use(express.static(__dirname + '/public/js'));
app.set("view engine", "ejs");

// File with API keys in it
const config = require('./config.js');


// All routes work so far
app.get('/', function(req, res) { 
    res.render('landingPage');
});

app.post('/reddit-search', function(req, res) {
    const username = req.body.user_search;
    // makeRedditRequest(username);
    res.send(req.body.user_search);
    // res.redirect('/');
})

app.post('/twitter-search', function(req, res) {
    const username = req.body.user_search;
    makeTwitterRequest(username);
    res.redirect('/');
})

app.post('/personal-text', function(req, res) {
    const usertext = req.body.usertext;
    res.send();
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

    twitterClient.get('statuses/user_timeline', tweetParams, function(error, tweets, response) {
        if(error) throw error;
        for(let i = 0; i < tweets.length; ++i) {
            console.log(tweets[i].full_text);  // The favorites.
        }
    });
}

// Reddit related functions
const REDDIT_ACCESS_TOKEN_URL = 'https://www.reddit.com/api/v1/access_token';


async function createSnoowrap() {
    var tokenData = await getRedditAccessToken();
    
    const r = new snoowrap({
        userAgent: 'Nina',
        accessToken: tokenData.access_token
    });

    r.getUser('yz50Racer').getComments()[0].then(console.log);
}

async function makeRedditRequest(username) {
    console.log("requesting token");
    var access_token = await getRedditAccessToken();
    console.log(access_token);
}

async function getRedditAccessToken() {
    const  REDDIT_CLIENT_ID  = 'ihUtacXSBGpYfg';
    const REDDIT_CLIENT_SECRET = 'pE96_1ULKQ80GVsYmyj59z4uAcU';

    const tokenData = await fetch(REDDIT_ACCESS_TOKEN_URL, {
        method: 'POST',
        body: 'grant_type=client_credentials',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ` + Buffer.from(`${REDDIT_CLIENT_ID}:${REDDIT_CLIENT_SECRET}`).toString('base64') // Put password as empty
        }
    }).then(function(response) {
        return response.json();
    })

    // Could return just tokenData.access_token. But, this is useful for checking expiration.
    return tokenData;
}

// Ibm related functions
const personalityInsights = new PersonalityInsightsV3(config.ibmCred);

// Start the server on port 8080
app.listen(8080, function(req, res) {
    console.log("Server started, port 8080");
});