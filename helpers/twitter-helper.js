const Twitter = require('twitter');
const config = require('../config');


function getTweets(username) {
    let tweetParams = {
        tweet_mode: 'extended', 
        screen_name: username,
        count: 5, 
        include_rts: false
    };

    let twitterClient = new Twitter(config.twitterCred);
    twitterClient.get('statuses/user_timeline', tweetParams, (error, tweets, response) => {
        if(error) throw error;

        for(let i = 0; i < tweets.length; ++i) {
            console.log(tweets[i].full_text);  // The favorites.
        }
    });
}

module.exports = { getTweets };