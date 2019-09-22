const icons = document.getElementsByClassName("icon");
const userSearchForm = document.getElementById("user-search-form");
const inputBox = document.getElementById("user-search-box");
const personalTextArea = document.getElementById("text-area-container");
const textarea = document.getElementsByTagName("textarea")[0];
const wordCountDiv = document.getElementById("word-count-div");
const wordCount = document.getElementById("word-count");


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
            wordCountDiv.classList.remove("hide");
            personalTextArea.classList.remove("hide");
            wordCounter();
        }
    });
}

function wordCounter() {
    let text = textarea.value;

    if(textarea.value === '') {
        wordCount.textContent = 0;
        return;
    }

    const regex = /\s+/gi;
    const wordCountVal = text.trim().replace(regex, ' ').split(' ').length;

    wordCount.textContent = wordCountVal;
}

function editForm(websiteName) {
    userSearchForm.action = `/results/${websiteName}`;
    inputBox.placeholder = `Enter a ${websiteName} username`;
    personalTextArea.classList.add("hide");
    wordCountDiv.classList.add("hide");
    userSearchForm.classList.remove("hide");
}