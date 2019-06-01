import {Enum} from "/scripts/Classes/Enum.js"
import {Category} from "./Classes/Category.js";
import {listMatcher} from "./index.js";

let icon = "/img/logo.svg";
let standartIcon = "/img/logo.svg";
const maxNameLenght = 15;
let status = false;
let defaultCategory = new Category("default", "c0");

class Prompt {
    writeIntoEnumList(enumListObject) {
        let addButton = document.querySelector("#enum-add");
        let enumList = document.querySelector("#enum-list");

        let textElement = document.createElement("span");
        textElement.textContent = enumListObject.name;

        let iconElementContainer = document.createElement("div");
        iconElementContainer.classList.add("icon-container");

        let iconElement = document.createElement("img");
        iconElement.classList.add("icon");
        iconElement.src = enumListObject.iconPicture;

        let contentElement = document.createElement("div");
        contentElement.classList.add("content");

        let enumElement = document.createElement("div");
        enumElement.classList.add("enum");
        enumElement.id = enumListObject.id;
        enumElement.addEventListener('click', listMatcher);

        enumElement.appendChild(contentElement);
        contentElement.appendChild(textElement);
        contentElement.insertBefore(iconElementContainer, textElement);
        iconElementContainer.appendChild(iconElement);

        enumList.insertBefore(enumElement, addButton);
        this.closePrompt();
    }

    removeErrorMessage(inputField, informationContainer) {
        let errorContainer = document.querySelector("#errors-name");
        let errorContainerChildren = Array.from(errorContainer.children);

        if (inputField.classList.contains("error-animation"))
            inputField.classList.toggle("error-animation");

        errorContainerChildren.forEach((item) => {
            errorContainer.removeChild(item);
        });
        console.log("... deleted Error Messages")
    }

    resetInputs() {
        let inputFild = document.querySelector("#prompt-content input");
        let textarea = document.querySelector("#prompt-content textarea");
        let informationContainer = document.querySelector("#information-container");
        let catigoriesContainer = document.querySelector('#tags')

        while (catigoriesContainer.children.length > 1) {
            if (!catigoriesContainer.firstElementChild.classList.contains("addCatigory")) {
                catigoriesContainer.removeChild(catigoriesContainer.firstChild);
            }
        }

        console.log(inputFild);
        console.log(textarea);

        inputFild.value = "";
        textarea.value = "";
        this.removeErrorMessage(inputFild, informationContainer);
        this.displayTextToPreview(inputFild)
    }

    closePrompt() {
        this.resetInputs();
        let promptBackground = document.querySelector('#prompt-background');
        let prompt = document.querySelector('#prompt');
        let promptContainer = document.querySelector('#prompt-container');

        prompt.style.transform = "scale(0,0)";
        promptBackground.style.opacity = "0";
        setTimeout(() => {
            promptContainer.style.display = "none";
        }, 100);

        status = false;
    }

    openPrompt() {
        Prompt.setuptPrompt();
        let promptBackground = document.querySelector('#prompt-background');
        let prompt = document.querySelector('#prompt');
        let promptContainer = document.querySelector('#prompt-container');

        promptContainer.style.display = "flex";
        setTimeout(() => {
            promptBackground.style.opacity = "0.8";
            prompt.style.transform = "scale(1,1)";
        }, 100);

        status = true;
    }

    noError(description, name) {
        let errorNum = 0;

        if (name === "")
            errorNum++;
        if (name.length > maxNameLenght) {
            errorNum++
        }

        if (errorNum > 0)
            return false;
        else
            return true;
    }

    outPutNoNameError(errorMessages) {
        let errorBox = document.querySelector("#errors-name");
        let nameBox = document.querySelector('#input-list-name');

        console.log(nameBox.classList);
        setTimeout(() => {
            nameBox.classList.toggle("error-animation");
            console.log(nameBox.classList);
        }, 100);

        errorMessages.forEach((item) => {
            let newError = document.createElement("span");
            newError.textContent = item;
            errorBox.appendChild(newError);
        })
    }

    getErrorMessages(name, description) {
        let errors = new Array();

        if (name === "")
            errors.push("Please enter a name");
        if (name.length > maxNameLenght)
            errors.push("Name is to long");

        return errors;
    }

    createNewEnum(konto) {
        let descriptionBox = document.querySelector('#input-list-description')
        let description = descriptionBox.value;
        let nameBox = document.querySelector('#input-list-name');
        let name = nameBox.value;
        let catigories = this.getCatigories()
        this.resetInputs();

        if (this.noError(description, name)) {
            let newEnum = new Enum(name, catigories, description, icon, "");
            this.writeIntoEnumList(newEnum)
            konto.enums.push(newEnum);
        } else
            this.outPutNoNameError(this.getErrorMessages(name, description));

        this.adjustListIconSize();
    }

    factoryEnum(konto, name, catigory, description, icon, banner) {
        let newEnum = new Enum(name, "", description, icon, "");
        this.writeIntoEnumList(newEnum)
        konto.enums.push(newEnum);
    }

    toggleOtherSelectedOff(parent) {
        let children = Array.from(parent.children);

        children.forEach(function (item) {
            if (item.classList.contains("selected-icon"))
                item.classList.toggle("selected-icon");
        });
    }

    selectIcon(iconPicture) {
        let iconTitlePreview = document.querySelector("#title-bar-current-icon");
        let iconSelectPreview = document.querySelector("#current-icon");
        let currentIcon = document.querySelector("#current-icon");

        iconSelectPreview.src = iconPicture.children[0].src;
        iconTitlePreview.src = iconPicture.children[0].src;
        icon = iconPicture.children[0].src;

        this.toggleOtherSelectedOff(iconPicture.parentElement);
        iconPicture.classList.toggle("selected-icon");
    }

    enrollIconSelect(enrollTitleBar, iconContainer) {
        enrollTitleBar.children[enrollTitleBar.children.length-1].classList.toggle("enroll-arrow");
        iconContainer.classList.toggle("enroll");
    }

    displayTextToPreview(nameInput) {
        let title = document.querySelector("#title");
        title.textContent = nameInput.value;
    }

    runKeyBoardShortCut(event, konto) {
        if (event.keyCode == 27) {
            this.closePrompt();
        } else if (event.keyCode == 13) {
            this.createNewEnum(konto);
        }
    }

    adjustListIconSize() {
        let allItems = document.querySelectorAll(".enum .content .icon-container");

        allItems.forEach((item) => {
            item.style.height = `${item.clientWidth}px`
        });
    }

    isOpened() {
        return status;
    }

    confirmCatigory(catigoryContainer, inputfield, name) {
        if (name == "")  {
            inputfield.firstElementChild.placeholder = "No Name entered";
            inputfield.firstElementChild.value = "";
        } else {
            let container = document.createElement("div");
            container.classList.add("tags-catigory");

            let textBox = document.createElement("span")
            textBox.textContent = name;

            let arrowButtonsContainer = document.createElement("div")
            arrowButtonsContainer.classList.add("up-down-container")

            let upButton = document.createElement("div");
            upButton.classList.add("tags-catigory-up")
            upButton.innerHTML = " &uarr; "

            let downButton = document.createElement("div");
            downButton.classList.add("tags-catigory-down")
            downButton.innerHTML = " &darr; "

            container.appendChild(textBox);
            container.appendChild(arrowButtonsContainer);

            arrowButtonsContainer.appendChild(upButton);
            arrowButtonsContainer.appendChild(downButton);

            catigoryContainer.insertBefore(container, inputfield);
            catigoryContainer.removeChild(inputfield);
        }
    }

    cancelCatigory(catigoryContainer, inputfield) {
        catigoryContainer.removeChild(inputfield);
    }

    createNewCatigoryPrompt() {
        let promptAllreadyCreated = false;
        let catigoryContainer = document.querySelector("#tags")
        let addButton = document.querySelector("#addCatigory")
        let catigoryContainerChildren = Array.from(catigoryContainer.children)

        catigoryContainerChildren.forEach((item) => {
            if (item.classList.contains("inputfield")) {
                promptAllreadyCreated = true;
            }
        })

        if (!promptAllreadyCreated) {
            console.log(this)
            let container = document.createElement("div")
            container.classList.add("tags-catigory")
            container.classList.add("inputfield")

            let input = document.createElement("input")
            input.type = "text";
            input.placeholder = "Catigory Name"

            let buttonContainer = document.createElement("div")
            buttonContainer.classList.add("confirm-buttons")

            let confirmButton = document.createElement("button")
            confirmButton.classList.add("confirm")
            confirmButton.innerHTML = " &check; "
            confirmButton.addEventListener("click", () => {this.confirmCatigory(catigoryContainer, container, input.value)})

            let cancelButton = document.createElement("button")
            cancelButton.classList.add("cancel")
            cancelButton.innerHTML = " &times; "
            cancelButton.addEventListener("click", () => {this.cancelCatigory(catigoryContainer, container)})

            container.appendChild(input)
            container.appendChild(buttonContainer)
            buttonContainer.appendChild(confirmButton)
            buttonContainer.appendChild(cancelButton)

            catigoryContainer.insertBefore(container, addButton)
        }
    }

    static setuptPrompt() {
        icon = standartIcon;
        let previewIcon = document.querySelector("#title-bar-current-icon");
        let previewIconTitleBar = document.querySelector("#current-icon");
        previewIcon.src = icon;
        previewIconTitleBar.src = icon;
    }

    getCatigories() {
        let catigoryContainer = document.querySelector("#tags");
        let catigoryContainerChildren = Array.from(catigoryContainer.children);
        let catigories = new Array();

        catigoryContainerChildren.forEach((item , index) => {
            if (!item.classList.contains("addCatigory")) {
                let category = new Category(item.firstElementChild.textContent,"e" + Enum.getNextID() + "c" + parseInt(index + 1));
                catigories.push(category)
            }
        });

        catigories.push(defaultCategory);

        return catigories;
    }
}


export {Prompt};
