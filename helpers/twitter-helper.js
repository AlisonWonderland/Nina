const Twitter = require('twitter');
const config = require('../config');


function getTweets(username) {
    const tweetParams = {
        tweet_mode: 'extended', 
        screen_name: username,
        count: 100, // CHANGED THIS TO 100 FROM 5.
        include_rts: false
    };

    const twitterClient = new Twitter(config.twitterCred);
    let tweets = "";
    tweets = twitterClient.get('statuses/user_timeline', tweetParams, (error, tweets, response) => {
        if(error) throw error;

        for(let i = 0; i < tweets.length; ++i) {
            // console.log(tweets[i].full_text);  // The favorites.
            return tweets[0];
        }
    });
    console.log(tweets);
}

module.exports = { getTweets };