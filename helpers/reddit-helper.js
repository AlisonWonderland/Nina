const snoowrap = require('snoowrap');
const fetch = require('node-fetch');
const config = require('../config');

const REDDIT_ACCESS_TOKEN_URL = 'https://www.reddit.com/api/v1/access_token';


async function getRedditAccessToken() {
    const  REDDIT_CLIENT_ID  = config.redditCred.client_id;
    const REDDIT_CLIENT_SECRET = config.redditCred.client_secret;

    const tokenData = await fetch(REDDIT_ACCESS_TOKEN_URL, {
        method: 'POST',
        body: 'grant_type=client_credentials',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ` + Buffer.from(`${REDDIT_CLIENT_ID}:${REDDIT_CLIENT_SECRET}`).toString('base64') // Put password as empty
        }
    }).then(response => {
        return response.json();
    }).catch(error => {
        res.send(error);
    })

    return tokenData;
}

async function createSnoowrap() {
    let tokenData = await getRedditAccessToken();
    
    return new snoowrap({
        userAgent: 'Nina',
        accessToken: tokenData.access_token
    });

}

async function getRedditComments(username) {
    let snoo = await createSnoowrap();

    return snoo.getUser(username).getComments({limit: 150})
        .then(commentsList => {
            let comments = "";
            for(let i = 0; i < commentsList.length; ++i) {
                comments += commentsList[i].body;
            }

            return comments;
        })
        .catch(err => {
            return new Error(err.error.error + ' '  +err.error.message);
        })
}

module.exports = { getRedditComments };