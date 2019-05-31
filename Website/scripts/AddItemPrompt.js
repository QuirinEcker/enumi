let status = false;

class AddItemPrompt {
    openPrompt() {
        let promptBackground = document.querySelector("#addItem-prompt-background");
        let prompt = document.querySelector("#addItem-prompt");
        let promptContainer = document.querySelector("#addItem-prompt-container");

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

        nameArea.value = "";
        catigoryArea.value = "c0"
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

    isOpened() {
        return status;
    }
}

export {AddItemPrompt}