import {Enum} from "/scripts/Classes/Enum.js"

let icon = "/img/logo.svg";
const MAXNAMELENGHT = 15;

function writeIntoEnumList(enumListObject) {
    let addButton = document.querySelector("#enum-add");
    let enumList = document.querySelector("#enum-list");

    let textElement = document.createElement("span");
    textElement.textContent = enumListObject.name;

    let iconElement = document.createElement("img");
    iconElement.classList.add("icon");
    iconElement.src = enumListObject.icon;

    let contentElement = document.createElement("div");
    contentElement.classList.add("content");

    let enumElement = document.createElement("div");
    enumElement.classList.add("enum");

    enumElement.appendChild(contentElement);
    contentElement.appendChild(textElement);
    contentElement.insertBefore(iconElement, textElement);

    enumList.insertBefore(enumElement, addButton);
    closePrompt();
}

function removeErrorMessage(inputField, informationContainer) {
    let errorContainer = document.querySelector("#errors-name");
    let errorContainerChildren = Array.from(errorContainer.children);
    inputField.classList.toggle("error-animation");

    errorContainerChildren.forEach((item) => {
        errorContainer.removeChild(item);
    });
    console.log("... deleted Error Messages")
}

function resetInputs() {
    let inputFild = document.querySelector("#prompt-content input");
    let textarea = document.querySelector("#prompt-content textarea");
    let informationContainer = document.querySelector("#information-container");

    console.log(inputFild);
    console.log(textarea);

    inputFild.value = "";
    textarea.value = "";
    removeErrorMessage(inputFild, informationContainer);
}

function closePrompt() {
    resetInputs();
    let promptBackground = document.querySelector('#prompt-background');
    let prompt = document.querySelector('#prompt');
    let promptContainer = document.querySelector('#prompt-container');

    prompt.style.transform = "scale(0,0)";
    promptBackground.style.opacity = "0";
    setTimeout(() => {
        promptContainer.style.display = "none";
    }, 100);
}

function openPrompt() {
    let promptBackground = document.querySelector('#prompt-background');
    let prompt = document.querySelector('#prompt');
    let promptContainer = document.querySelector('#prompt-container');

    promptContainer.style.display = "flex";
    setTimeout(() => {
        promptBackground.style.opacity = "0.8";
        prompt.style.transform = "scale(1,1)";
    }, 100);
}

function noError(description, name) {
    let errorNum = 0;

    if (name === "")
        errorNum++;
    if (name.length > MAXNAMELENGHT) {
        errorNum++
    }

    if (errorNum > 0)
        return false;
    else
        return true;
}

function outPutNoNameError(errorMessages) {
    let errorBox = document.querySelector("#errors-name");
    let nameBox = document.querySelector('#input-list-name');
    nameBox.classList.toggle("error-animation");

    errorMessages.forEach((item) => {
        let newError = document.createElement("span");
        newError.textContent = item;
        errorBox.appendChild(newError);
    })
}

function getErrorMessages(name, description) {
    let errors = new Array();

    if (name === "")
        errors.push("Please enter a name");
    if (name.length > MAXNAMELENGHT)
        errors.push("Name is to long");

    return errors;
}

function createNewEnum() {
    let descriptionBox = document.querySelector('#input-list-description')
    let description = descriptionBox.value;
    let nameBox = document.querySelector('#input-list-name');
    let name = nameBox.value;
    resetInputs();

    if (noError(description, name)) {
        let newEnum = new Enum(name, "", description, icon, "");
        newEnum.loadListIntoUI();
    } else
        outPutNoNameError(getErrorMessages(name, description));
}

function toggleOtherSelectedOff(parent) {
    let children = Array.from(parent.children);

    children.forEach(function (item) {
        if (item.classList.contains("selected-icon"))
            item.classList.toggle("selected-icon");
    });
}

window.addEventListener("load", () => {
	let addButton = document.querySelector("#enum-add");
	let promptBackground = document.querySelector("#prompt-background");
    let promptCancel = document.querySelector('#cancel-button');
    let promptSubmit = document.querySelector('#submit-button');
    let nameInput = document.querySelector('#input-list-name');
    let title = document.querySelector("#title");
    let iconTitle = document.querySelector("#input-icon-title");
    let iconContainer = document.querySelector("#input-list-icon");
    let iconContainerChildren = Array.from(iconContainer.children);
    let iconTitlePreview = document.querySelector("#title-bar-current-icon");
    let iconSelectPreview = document.querySelector("#current-icon");

    iconTitlePreview.src = icon;
    iconSelectPreview.src = icon;

    iconContainerChildren.forEach((item) => {
        item.addEventListener("click", function() {
            let currentIcon = document.querySelector("#current-icon");
            iconSelectPreview.src = this.children[0].src;
            iconTitlePreview.src = this.children[0].src;
            icon = this.children[0].src;
            toggleOtherSelectedOff(this.parentElement);
            console.log(this.clientHeight);
            this.classList.toggle("selected-icon");
        });
    });

    iconTitle.addEventListener("click", function() {
        this.children[this.children.length-1].classList.toggle("enroll-arrow");
        iconContainer.classList.toggle("enroll");
    });

    nameInput.addEventListener("input", function() {
        title.textContent = this.value;
    });

	addButton.addEventListener("click", () => {
        openPrompt();
    });

	promptBackground.addEventListener("click", () => {
	    closePrompt()
    });

    promptCancel.addEventListener("click", () => {
        closePrompt();
    });

    promptSubmit.addEventListener("click", () => {
        createNewEnum();
    });

    document.addEventListener('keydown', function(event) {
        if(event.keyCode == 27) {
            closePrompt();
        } else if(event.keyCode == 13) {
            createNewEnum();
        }
    });
});

export {writeIntoEnumList}
