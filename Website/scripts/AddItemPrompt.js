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

    }
}

export {AddItemPrompt}