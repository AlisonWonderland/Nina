const PersonalityInsightsV3 = require('ibm-watson/personality-insights/v3');
const config = require('../config');
const personalityInsights = new PersonalityInsightsV3(config.ibmCred);

async function analyzeText(text) {
    const profileParams = {
        content: text,
        content_type: 'text/plain',
        consumption_preferences: true,
        raw_scores: true,
    };

    // Will have to do something with this profile.
    personalityInsights.profile(profileParams)
        .then(profile => {
            console.log(JSON.stringify(profile, null, 2));
        })
        .catch(err => {
            console.log('error:', err);
        });

}

exports.analyzeText = analyzeText;