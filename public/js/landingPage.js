const icons = document.getElementsByClassName("icon");
const userSearchForm = document.getElementById("user-search-form");
const inputBox = document.getElementById("user-search-box");
const textareaContainer = document.getElementById("text-area-container");
const textarea = document.getElementsByTagName("textarea")[0];
const ptSubmitBtn = document.getElementById("pt-btn");
const wordCountDiv = document.getElementById("word-count-div");
const wordCountSpan = document.getElementById("word-count");


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
            editForm("keyboard");
            wordCounter();
        }
    });
}

function wordCounter() {
    let text = textarea.value;

    if(textarea.value === '') {
        wordCountSpan.textContent = 0;
        return;
    }

    const regex = /\s+/gi;
    const wordCountVal = text.trim().replace(regex, ' ').split(' ').length;
    wordCountSpan.textContent = wordCountVal;

    if(wordCountVal < 100) {
        ptSubmitBtn.disabled = true;
    }
    else {
        ptSubmitBtn.disabled = false;
    }
}

function editForm(iconName) {
    if(iconName === "twitter" || iconName === "reddit") {
        userSearchForm.action = `/results/${iconName}`;
        inputBox.placeholder = `Enter a ${iconName} username`;
        textareaContainer.classList.add("hide");
        wordCountDiv.classList.add("hide");
        userSearchForm.classList.remove("hide");
        userSearchForm.classList.add("center-column");
    }

    else {
        textareaContainer.classList.remove("hide");
        wordCountDiv.classList.remove("hide");
        userSearchForm.classList.add("hide");
        textareaContainer.classList.add("center-column");
    }
}