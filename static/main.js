var io = io();

io.on("ready", function(data) {
});

io.on("o", function(data) {
	document.getElementById("terminal").innerText += data;
	window.scrollTo(0, document.body.scrollHeight);
});

document.addEventListener("click", function(event) {
	if(event.clientY > input.offsetTop + input.offsetHeight || (event.clientY > input.offsetTop && event.clientX > input.offsetLeft)) {
		input.focus();
	}
});

input.addEventListener("keydown", function(event) {
	if(event.keyCode == "13") {
		io.emit("i", input.innerText + "\n");
		input.innerText = "";
	}
});
