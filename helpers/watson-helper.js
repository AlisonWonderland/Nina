const PersonalityInsightsV3 = require('ibm-watson/personality-insights/v3');
const PersonalityTextSummaries = require('personality-text-summary');

const config = require('../config');
const personalityInsights = new PersonalityInsightsV3(config.ibmCred);
const v3EnglishTextSummaries = new PersonalityTextSummaries({ locale: 'en', version: 'v3' });


function formatTraits(traits, traitsType='') {
    if(traitsType === 'big5') {
        for(let i = 0; i < traits.length; ++i) {
            traits[i].percentile = Math.round(traits[i].percentile * 100);
            
            let children = traits[i].children;
            for(let j = 0; j < children.length; ++j) {
                children[j].percentile = Math.round(children[j].percentile * 100);
            }
        }
    }

    else {
        for(let i = 0; i < traits.length; ++i) {
            traits[i].percentile = Math.round(traits[i].percentile * 100);
        }
    }

    return traits;
}

function sortTraits(traits, traitsType='') {
    if(traitsType === 'big5') {
        for(let i = 0; i < traits.length - 1; ++i) {
            for(let j = i + 1; j < traits.length; ++j) {
                if(traits[i].percentile < traits[j].percentile) {
                    let temp = traits[i];
                    traits[i] = traits[j];
                    traits[j] = temp;
                }
            }
        }

    
        // Sorting their child traits.
        for(let i = 0; i < traits.length; ++i) {
            let children = traits[i].children;

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
    }

    else {
        for(let i = 0; i < traits.length - 1; ++i) {
            for(let j = i + 1; j < traits.length; ++j) {
                if(traits[i].percentile < traits[j].percentile) {
                    let temp = traits[i];
                    traits[i] = traits[j];
                    traits[j] = temp;
                }
            }
        }
    }

    return traits;
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
            return new Error(err.message);
        });

}

async function createPortrait(userText, username='') {
    const profile = await createProfile(userText);

    if(profile instanceof Error) {
        return profile;
    }

    let portrait = {};
    portrait.username = username;
    portrait.summary = v3EnglishTextSummaries.getSummary(profile);
    portrait.big5Traits = sortTraits(formatTraits(profile.personality, 'big5'), 'big5');
    portrait.needs = sortTraits(formatTraits(profile.needs, 'needs'));
    portrait.values = sortTraits(formatTraits(profile.values, 'values'));

    return portrait;
}

exports.createPortrait = createPortrait;