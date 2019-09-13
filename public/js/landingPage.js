const icons = document.getElementsByClassName("icon");
const userSearchForm = document.getElementById("user-search-form");
const inputBox = document.getElementById("user-search-box");
const personalTextArea = document.getElementById("text-area-container");
const textarea = document.getElementsByTagName("textarea")[0];
const personalTextFYI = document.getElementById("pt-fyi");
const wordCount = document.getElementById("word-count");


function wordCounter() {
    let text = textarea.value;

    const regex = /\s+/gi;
    const wordCountVal = text.trim().replace(regex, ' ').split(' ').length;

    wordCount.textContent = wordCountVal;
}

// Event Listeners:

// Event listeners for wordCounter
textarea.addEventListener('change', wordCounter);
textarea.addEventListener('keydown', wordCounter);
textarea.addEventListener('keyup', wordCounter);
textarea.addEventListener('blur', wordCounter);
textarea.addEventListener('foucs', wordCounter);

// Event listener for icon clicks
for(let i = 0; i < icons.length; ++i) {
    icons[i].addEventListener("click", function() {
        if(this.classList.contains("reddit")) {
            editForm("reddit");
        }
        else if(this.classList.contains("twitter")) {
            editForm("twitter");
        }
        else if(this.classList.contains("keyboard")) {
            userSearchForm.classList.add("hide");
            personalTextFYI.classList.remove("hide");
            personalTextArea.classList.remove("hide");
        }
    });
}

// Event Listener helper functions

function editForm(websiteName) {
    userSearchForm.action = `/results/${websiteName}`;
    inputBox.placeholder = `Enter a ${websiteName} username`;
    personalTextArea.classList.add("hide");
    personalTextFYI.classList.add("hide");
    userSearchForm.classList.remove("hide");
}