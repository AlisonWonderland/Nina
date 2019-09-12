// have textarea and submission form hidden initally.
// when a person clicks an icon present the associated submission form
// - two different actions, "/reddit.." or "/fetchtwitter" and placeholders "reddit username".
// sumbission forms are interchangable with each click
// var twitterIcon = document.querySelector(".twitter");
// var redditIcon = document.querySelector(".reddit");
var icons = document.getElementsByClassName("icon");

var userSearchForm = document.getElementById("user-search-form");
var inputBox = document.getElementById("user-search-box");
var personalTextBox = document.getElementById("personal-text");





// Event Listeners:

for(var i = 0; i < icons.length; ++i) {
    icons[i].addEventListener("click", function() {
        if(this.classList.contains("reddit")) {
            displayForm("reddit");
        }
        else if(this.classList.contains("twitter")) {
            displayForm("twitter");
        }
        else if(this.classList.contains("keyboard")) {
            userSearchForm.classList.add("hide");
            personalTextBox.classList.remove("hide");
        }
    });
}

// Event Listener helper functions

function displayForm(websiteName) {
    userSearchForm.action = `/results/${websiteName}`;
    inputBox.placeholder = `Enter a ${websiteName} username`;
    personalTextBox.classList.add("hide");
    userSearchForm.classList.remove("hide");
}

