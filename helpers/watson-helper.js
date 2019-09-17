const PersonalityInsightsV3 = require('ibm-watson/personality-insights/v3');
const PersonalityTextSummaries = require('personality-text-summary');

const config = require('../config');
const personalityInsights = new PersonalityInsightsV3(config.ibmCred);
const v3EnglishTextSummaries = new PersonalityTextSummaries({ locale: 'en', version: 'v3' });

function formatTraits(big5Traits) {
    for(let i = 0; i < big5Traits.length; ++i) {
        big5Traits[i].percentile = Math.round(big5Traits[i].percentile * 10000) / 100;
        let children = big5Traits[i].children;

        for(let j = 0; j < children.length; ++j) {
            children[j].percentile = Math.round(children[j].percentile * 10000) / 100;
        }
    }

    return big5Traits;
}

function sortTraits(big5Traits) {
    // Sorting big5Traits.
    for(let i = 0; i < big5Traits.length - 1; ++i) {
        for(let j = i + 1; j < big5Traits.length; ++j) {
            if(big5Traits[i].percentile < big5Traits[j].percentile) {
                let temp = big5Traits[i];
                big5Traits[i] = big5Traits[j];
                big5Traits[j] = temp;
            }
        }
    }

    // Sorting their child traits.
    for(let i = 0; i < big5Traits.length; ++i) {
        let children = big5Traits[i].children;

        for(let j = 0; j < children.length - 1; ++j) {
            for(let k = j + 1; k < children.length; ++k) {
                if(children[j].percentile < children[k].percentile) {
                    let temp = children[j];
                    children[j] = children[k];
                    children[k] = temp;
                }
            }
        }
    }

    return big5Traits;
}

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
    
    portrait.big5Traits = sortTraits(formatTraits(profile.personality));

    console.log("+++++++++++++++++Children+++++++++++++++++++++++");
    console.log(portrait.big5Traits[0].children);

    return portrait;
}

exports.createPortrait = createPortrait;