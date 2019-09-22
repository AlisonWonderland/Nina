const watson = require('./helpers/watson-helper');
const reddit = require('./helpers/reddit-helper');
const twitter = require('./helpers/twitter-helper');
// const analyze = require('./helpers/analysis-helper');


module.exports = (app) => {
    app.get('/', (req, res) => { 
        res.render('landingPage');
    });   

    app.get('/results', (req, res) => {
        const big5 = [
            {
                name: 'First',
                percentile: 98.23,
                children: [
                    {
                        percentile: 98.10,
                        name: 'one'
                    },
                    {
                        percentile: 92.23,
                        name: 'two'
                    }
                ]
            },
            {
                name: 'Second',
                percentile: 91.25,
                children: [
                    {
                        percentile: 98.10,
                        name: 'one'
                    },
                    {
                        percentile: 92.23,
                        name: 'two'
                    }
                ]
            },
            {
                name: 'Third',
                percentile: 81.76,
                children: [
                    {
                        percentile: 98.10,
                        name: 'one'
                    },
                    {
                        percentile: 92.23,
                        name: 'two'
                    }
                ]
            },
            {
                name: 'Fourth',
                percentile: 60.21,
                children: [
                    {
                        percentile: 98.10,
                        name: 'one'
                    },
                    {
                        percentile: 92.23,
                        name: 'two'
                    }
                ]
            },
            {
                name: 'Fifth',
                percentile: 40.01,
                children: [
                    {
                        percentile: 98.10,
                        name: 'one'
                    },
                    {
                        percentile: 92.23,
                        name: 'two'
                    }
                ]
            }
        ];
    
        const needs = [
            {
                percentile: 98.10,
                name: 'needs1'
            },
            {
                percentile: 92.23,
                name: 'needs2'
            },
            {
                percentile: 78.23,
                name: 'needs3'
            },
            {
                percentile: 54.12,
                name: 'needs4'
            },
            {
                percentile: 31.21,
                name: 'needs5'
            }
        ]
    
        const values = [
            {
                percentile: 98.10,
                name: 'values1'
            },
            {
                percentile: 92.23,
                name: 'values2'
            },
            {
                percentile: 78.23,
                name: 'values3'
            },
            {
                percentile: 54.12,
                name: 'values4'
            },
            {
                percentile: 31.21,
                name: 'values5'
            }
        ]
    
        res.render('results', {username: 'tset', summary: 'Summary', big5Traits: big5, needs: needs, values: values})
    })

    app.post('/results/reddit', redditorAnalysis);

    app.post('/results/twitter', (req,res) => {
        const username = req.body.user_search;
        const tweets = twitter.getTweets(username);
        // watson.createPortrait(tweets);
        res.redirect('/');
    })

    // Move anon function to a separate function.
    app.post('/results/personal-text', async (req,res) => {
        const usertext = req.body.usertext;
        // following two lines can be placed in a new function
        const personalityPortrait = await watson.createPortrait(usertext, "");
        res.render('results', personalityPortrait);
    });

    app.get('/*', (req, res) => {
        res.render('page-invalid');
    })
}

// Could be put in another file or even watson-helper
async function redditorAnalysis(req, res) {
    const username = req.body.user_search;
    const comments = await reddit.getRedditComments(username);

    if(comments instanceof Error) {
        res.render('error', {error_msg: comments.message});
        return;
    }

    else {
        const personalityPortrait = await watson.createPortrait(comments, username);
        // console.log(personalityPortrait);
        res.render('results', personalityPortrait);
    }
}