import {Enum} from "/scripts/Classes/Enum.js"

let icon = "/img/logo.svg";

function writeIntoEnumList(enumListObject) {
    if (enumListObject.name === "") {
        let informationContainer = document.querySelector("#information-container");
        let nameBox = document.querySelector('#input-list-name');
        nameBox.classList.toggle("error-animation");
        let errormessage = document.createElement("span");
        errormessage.textContent = "Please enter a name !";
        errormessage.classList.add("error-message");
        informationContainer.insertBefore(errormessage, informationContainer.children[1]);
    } else {
        let addButton = document.querySelector("#enum-add");
        let enumList = document.querySelector("#enum-list");

        let textElement = document.createElement("span");
        textElement.textContent = enumListObject.name;

        let iconElement = document.createElement("img");
        iconElement.classList.add("icon");
        iconElement.src = enumListObject.icon;

        let contentElement = document.createElement("div");
        contentElement.classList.add("content")

        let enumElement = document.createElement("div");
        enumElement.classList.add("enum");

        enumElement.appendChild(contentElement);
        contentElement.appendChild(textElement);
        contentElement.insertBefore(iconElement, textElement);

        enumList.insertBefore(enumElement, addButton);
        closePrompt();
    }
}

function removeErrorMessage(inputFild, informationContainer) {
    if (informationContainer.children[1].classList.length > 0) {
        informationContainer.removeChild(informationContainer.children[1])
        inputFild.classList.toggle("error-animation");
    }
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

function createNewEnum() {
    let descriptionBox = document.querySelector('#input-list-description')
    let description = descriptionBox.value;
    let nameBox = document.querySelector('#input-list-name');
    let name = nameBox.value;

    let newEnum = new Enum(name, "", description, icon, "");
    newEnum.loadListIntoUI();
}

function toggleOtherSelectedOff(parent) {
     let children = Array.from(parent.children);

     children.forEach(function(item, index) {
         if (item.classList.contains("selected-icon")) {
             item.classList.toggle("selected-icon");
             item.style.width = `${item.clientWidth + 2}px`;
         }
     });
}

function loadSelectedListIcon() {
    let iconContainer = document.querySelector("#input-list-icon");
    let children = Array.from(iconContainer.children);

    children.forEach((item) => {
        if (item.classList.contains("selected-icon")) {
            item.style.width = `${item.clientWidth - 2}px`;
        }
    });
}

function selectItem(icon) {

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

    iconContainerChildren.forEach((item) => {
        item.addEventListener("click", function() {
            selectItem(this);
            let currentIcon = document.querySelector("#current-icon");
            currentIcon.src = this.children[0].src;
            icon = this.children[0].src;
            toggleOtherSelectedOff(this.parentElement);
            console.log(this.clientHeight);
            //this.style.width= `${this.clientWidth - 2}px`;
            this.classList.toggle("selected-icon");
            loadSelectedListIcon()
        });
    });

    iconTitle.addEventListener("click", function() {
        this.children[this.children.length-1].classList.toggle("enroll-arrow");
        iconContainer.classList.toggle("enroll");
        loadSelectedListIcon();
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
