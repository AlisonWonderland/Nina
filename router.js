const watson = require('./helpers/watson-helper');
const reddit = require('./helpers/reddit-helper');
const twitter = require('./helpers/twitter-helper');
// const analyze = require('./helpers/analysis-helper');


module.exports = (app) => {
    app.get('/', (req, res) => { 
        res.render('landingPage');
    });   

    app.get('/error', (req, res) => {
        res.render('error', {error_msg: '404'})
    })

    app.post('/results/reddit', redditorAnalysis);

    app.post('/results/twitter', (req,res) => {
        const username = req.body.user_search;
        const tweets = twitter.getTweets(username);
        // watson.createPortrait(tweets);
        res.redirect('/');
    })

    app.post('/results/personal-text', (req,res) => {
        const usertext = req.body.usertext;
        // watson.createPortrait(usertext);
        res.send(usertext);
    });

    app.get('/*', (req, res) => {
        res.render('page-invalid');
    })
}

async function redditorAnalysis(req, res) {
    const username = req.body.user_search;
    // v1
    const comments = await reddit.getRedditComments(username);

    if(comments instanceof Error) {
        res.render('error', {error_msg: comments.message});
        return;
    }

    else {
        const personalityPortrait = await watson.createPortrait(comments, username);
        console.log(personalityPortrait);
        res.render('results', personalityPortrait);
    }
}