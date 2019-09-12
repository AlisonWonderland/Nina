const watson = require('./helpers/watson-helper');
const reddit = require('./helpers/reddit-helper');
const twitter = require('./helpers/twitter-helper');


module.exports = (app) => {
    app.get('/', (req, res) => { 
        res.render('landingPage');
    });    

    app.post('/results/reddit', async (req,res) => {
        const username = req.body.user_search;
        const comments = await reddit.getRedditComments(username);
        // watson.analyzeText(comments);
        res.redirect('/');
    })

    app.post('/results/twitter', (req,res) => {
        const username = req.body.user_search;
        twitter.getTweets(username);
        // watson.analyzeText(comments);
        res.redirect('/');
    })

    app.post('/results/personal-text', (req,res) => {
        const usertext = req.body.usertext;
        watson.analyzeText(usertext);
        res.send(usertext);
    });
}