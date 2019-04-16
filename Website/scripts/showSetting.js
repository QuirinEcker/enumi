"use strict";

window.addEventListener("load", () => {
	// setting.js
	let settings = document.querySelectorAll(".settings-point");
	let enums = document.querySelectorAll(".enum");
	
	for(let setting of settings) {
		setting.addEventListener("mouseover", function() {
            setting.children[0].style.top = "0%";
		});
		
		setting.addEventListener("mouseout", function() {
			setting.children[0].style.top = "50%";
		});
	}
	
	for(let i = 0; i < enums.length; i++) {
		enums[i].addEventListener("mouseover", () => {
			enums[i].children[1].children[0].style.width = "100%";
		});
		
		enums[i].addEventListener("mouseout", () => {
			enums[i].children[1].children[0].style.width = "0%";
		});
	}
});