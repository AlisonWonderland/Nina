const PersonalityInsightsV3 = require('ibm-watson/personality-insights/v3');
const PersonalityTextSummaries = require('personality-text-summary');

const config = require('../config');
const personalityInsights = new PersonalityInsightsV3(config.ibmCred);
const v3EnglishTextSummaries = new PersonalityTextSummaries({ locale: 'en', version: 'v3' });

function createProfile(text) {
    const profileParams = {
        content: text,
        content_type: 'text/plain',
        consumption_preferences: true,
        raw_scores: true,
    };

    return personalityInsights.profile(profileParams)
        .then(profile => {
            return profile;
        })
        .catch(err => {
            console.log('error:', err);
            reject(err);
        });

}

async function createPortrait(text, username) {
    const profile = await createProfile(text);
    let portrait = {};

    portrait.username = username;
    portrait.summary = v3EnglishTextSummaries.getSummary(profile);
    portrait.personalities = profile.personality;

    return portrait;
}

exports.createPortrait = createPortrait;