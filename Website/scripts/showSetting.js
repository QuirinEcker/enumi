"use strict";

window.addEventListener("load", () => {
	// setting.js
	let settings = document.querySelectorAll(".settings-point");
	
	for(let setting of settings) {
		setting.addEventListener("mouseover", function() {
            setting.children[0].style.top = "0%";
		});
		
		setting.addEventListener("mouseout", function() {
			setting.children[0].style.top = "50%";
		});
	}
});