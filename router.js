const watson = require('./helpers/watson-helper');
const reddit = require('./helpers/reddit-helper');
const twitter = require('./helpers/twitter-helper');


module.exports = (app) => {
    app.get('/', (req, res) => { 
        res.render('landingPage');
    });   

    app.post('/results/reddit', redditorAnalysis);

    app.post('/results/twitter', twitterAnalysis);

    app.post('/results/personal-text', ptAnalysis);

    app.get('/*', (req, res) => {
        res.render('page-invalid');
    })
}

async function redditorAnalysis(req, res) {
    const username = req.body.user_search;
    const comments = await reddit.getRedditComments(username);

    if(comments instanceof Error) {
        res.render('error', {error_msg: comments.message, analysis_step: "user lookup"});
        return;
    }

    createPortrait(comments, username, res);

}

async function twitterAnalysis(req, res) {
    const username = req.body.user_search;
    const tweets = await twitter.getTweets(username);

    if(tweets instanceof Error) {
        res.render('error', {error_msg: tweets.message, analysis_step: "user lookup"});
        return;
    }

    createPortrait(tweets, username, res);
}

async function ptAnalysis(req, res) {
    const usertext = req.body.usertext;
    createPortrait(usertext, "", res);
}

async function createPortrait(userText, username, res) {
    const personalityPortrait = await watson.createPortrait(userText, username);
    if(personalityPortrait instanceof Error) {
        res.render('error', {error_msg: personalityPortrait.message, analysis_step: "portrait creation"});
        return;
    }
    
    res.render('results', personalityPortrait);
}