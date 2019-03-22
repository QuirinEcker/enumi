window.onload = () => {
	let settings = document.querySelectorAll(".settings-point");
	
	for(let setting of settings) {
		setting.addEventListener("mouseover", () => {
			console.log("worked")
		});
	}
}