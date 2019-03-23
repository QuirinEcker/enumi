window.onload = () => {
	let addButton = document.querySelector("#enum-add")
	
	
	addButton.addEventListener("click", () => {
		let name = prompt("Bitte geben sie einen Namen der Liste ein");
		let enumList = document.querySelector("#enum-list");
		
		
		let textElement = document.createElement("span");
		textElement.textContent = name;
		let enumElement = document.createElement("div");
		enumElement.classList.add("enum");
		console.log(enumElement);
		enumElement.appendChild(textElement);
		enumList.appendChild(enumElement);
	});
}