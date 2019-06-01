let status = false;

class AddItemPrompt {
    openPrompt(currentEnum) {
        let promptBackground = document.querySelector("#addItem-prompt-background");
        let prompt = document.querySelector("#addItem-prompt");
        let promptContainer = document.querySelector("#addItem-prompt-container");
        let catigoriesSelector = document.querySelector("#addItem-prompt-input-catigory");
        let catigories = currentEnum.catigories;
        console.log(currentEnum);

        catigories.forEach((item, index) => {
            let selectorElement = document.createElement("option");
            selectorElement.innerHTML = item.name;
            selectorElement.value = item.id;

            catigoriesSelector.appendChild(selectorElement);
        })

        console.log("... opan promtus");

        promptContainer.style.display = "flex";
        setTimeout(() => {
            promptBackground.style.opacity = "0.8";
            prompt.style.transform = "scale(1,1)";
        }, 100)

        status = true;
    }

    closePrompt() {
        let promptBackground = document.querySelector("#addItem-prompt-background");
        let prompt = document.querySelector("#addItem-prompt");
        let promptContainer = document.querySelector("#addItem-prompt-container");
        this.resetInputs();

        promptBackground.style.opacity = "0";
        prompt.style.transform = "scale(0,0)";
        setTimeout(() => {
            promptContainer.style.display = "none";
        }, 100)

        status = false;
    }

    resetInputs() {
        let nameArea = document.querySelector("#addItem-prompt-input-name");
        let catigoryArea = document.querySelector("#addItem-prompt-input-catigory");
        let menubarTitle = document.querySelector("#addItem-prompt-title");
        let catigoriesSelector = document.querySelector("#addItem-prompt-input-catigory");

        while (catigoriesSelector.children.length > 1) {
            catigoriesSelector.removeChild(catigoriesSelector.lastElementChild);
        }

        nameArea.value = "";
        catigoryArea.value = "c0"
        menubarTitle.textContent = "";
    }

    getData() {
        let nameArea = document.querySelector("#addItem-prompt-input-name");
        let catigoryArea = document.querySelector("#addItem-prompt-input-catigory");
        let icon = nameArea.value.charAt(0).toUpperCase();

        return {
            name: nameArea.value,
            catigoryArea: catigoryArea.value,
            icon: icon
        }
    }

    refreshMenuBarTitle() {
        let nameArea = document.querySelector("#addItem-prompt-input-name");
        let menubarTitle = document.querySelector("#addItem-prompt-title");
        menubarTitle.textContent = nameArea.value;

    }

    isOpened() {
        return status;
    }
}

export {AddItemPrompt}