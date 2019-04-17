"use strict";

function showPrompt() {
    let promptBackground = document.querySelector('#prompt-background');
    let prompt = document.querySelector('#prompt');
    let promptContainer = document.querySelector('#prompt-container');

    promptContainer.style.display = "flex";
    setTimeout(() => {
        promptBackground.style.opacity = "0.8"
        prompt.style.transform = "scale(1,1)"
    }, 10);
}

window.addEventListener("load", () => {
	let addButton = document.querySelector("#enum-add");

	addButton.addEventListener("click", () => {
		showPrompt();

		let enumList = document.querySelector("#enum-list");
		
		let hoverContainer = document.createElement("div");
		hoverContainer.classList.add("hover");
		let hover = document.createElement("div");
		hoverContainer.appendChild(hover);
		
		let textElement = document.createElement("span");
		textElement.textContent = name;
		
		let enumElement = document.createElement("div");
		enumElement.classList.add("enum");
		enumElement.addEventListener("mouseover", function() {
			this.children[1].children[0].style.width = "100%";
		});
		enumElement.addEventListener("mouseout", function() {
			this.children[1].children[0].style.width = "0%";
		});
		enumElement.appendChild(textElement);
		enumElement.appendChild(hoverContainer);
		
		enumList.insertBefore(enumElement, addButton);
	});
});