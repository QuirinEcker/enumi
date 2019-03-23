window.onload = () => {
	
	// setting.js
	let settings = document.querySelectorAll(".settings-point");
	let enums = document.querySelectorAll(".enum");
	console.log(enums);
	
	for(let setting of settings) {
		setting.addEventListener("mouseover", () => {
			setting.children[0].style.top = "0%";
		});
		
		setting.addEventListener("mouseout", () => {
			setting.children[0].style.top = "50%";
		});
	}
	
	for(let i = 0; i < enums.length; i++) {
		enums[i].addEventListener("mouseover", () => {
			enums[i].children[1].children[0].style.width = "100%";
			//enums[i].children[0].style.color = "black";
		});
		
		enums[i].addEventListener("mouseout", () => {
			enums[i].children[1].children[0].style.width = "0%";
			//enums[i].children[0].style.color = "white";
		});
	}
	
	// add.js
	
	let addButton = document.querySelector("#enum-add")
	
	addButton.addEventListener("click", () => {
		let name = prompt("Bitte geben sie einen Namen der Liste ein");
		let enumList = document.querySelector("#enum-list");
		
		let hoverContainer = document.createElement("div");
		hoverContainer.classList.add("hover");
		let hover = document.createElement("div");
		hoverContainer.appendChild(hover)
		console.log(hover)
		
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
}