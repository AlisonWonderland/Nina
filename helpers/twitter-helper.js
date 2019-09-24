const Twitter = require('twitter');
const config = require('../config');


async function getTweets(username) {
    const tweetParams = {
        tweet_mode: 'extended', 
        screen_name: username,
        count: 100, 
        include_rts: false
    };

    const twitterClient = new Twitter(config.twitterCred);
    
    let userTweets = await twitterClient.get('statuses/user_timeline', tweetParams) 
        .then(tweets => {
            let userTweets = ""; 
            for(let i = 0; i < tweets.length; ++i) {
                userTweets += tweets[i].full_text + "\n";
            }
            return userTweets;
        })
        .catch(err => {
            return new Error(err[0].message);
        });

    return userTweets;
}

module.exports = { getTweets };