import {Enum} from "/scripts/Classes/Enum.js"
import {listMatcher} from "./index.js";

let icon = "/img/logo.svg";
const maxNameLenght = 15;

class Prompt {
    writeIntoEnumList(enumListObject) {
        let addButton = document.querySelector("#enum-add");
        let enumList = document.querySelector("#enum-list");

        let textElement = document.createElement("span");
        textElement.textContent = enumListObject.name;

        let iconElement = document.createElement("img");
        iconElement.classList.add("icon");
        iconElement.src = enumListObject.iconPicture;

        let contentElement = document.createElement("div");
        contentElement.classList.add("content");

        let enumElement = document.createElement("div");
        enumElement.classList.add("enum");
        enumElement.addEventListener('click', listMatcher);

        enumElement.appendChild(contentElement);
        contentElement.appendChild(textElement);
        contentElement.insertBefore(iconElement, textElement);

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

        console.log(inputFild);
        console.log(textarea);

        inputFild.value = "";
        textarea.value = "";
        this.removeErrorMessage(inputFild, informationContainer);
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
    }

    openPrompt() {
        let promptBackground = document.querySelector('#prompt-background');
        let prompt = document.querySelector('#prompt');
        let promptContainer = document.querySelector('#prompt-container');

        promptContainer.style.display = "flex";
        setTimeout(() => {
            promptBackground.style.opacity = "0.8";
            prompt.style.transform = "scale(1,1)";
        }, 100);
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
        this.resetInputs();

        if (this.noError(description, name)) {
            let newEnum = new Enum(name, "", description, icon, "");
            this.writeIntoEnumList(newEnum)
            konto.enums.push(newEnum);
        } else
            this.outPutNoNameError(this.getErrorMessages(name, description));
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

    runKeyBoardShortCut(event) {
        if (event.keyCode == 27) {
            this.closePrompt();
        } else if (event.keyCode == 13) {
            this.createNewEnum();
        }
    }
}


export {Prompt};
