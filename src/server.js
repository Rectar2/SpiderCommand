var app = require("./app"),
	http = require("http"),
	spawn = require("child_process").spawn;

var server = http.createServer(app);

var io = require("socket.io")(server);

io.on("connection", function(socket) {
	socket.proc = spawn("cmd.exe", {
		"cwd": "/",
		"detached": false
	});

	socket.on("i", function(data) {
		socket.proc.stdin.write(data);
	});

	socket.on("b", function() {
		console.log("Backspace");
		socket.proc.stdin.write("\b");
	})

	socket.emit("ready");

	function output(data) {
		socket.emit("o", data.toString("ascii"));
	}
	socket.proc.stderr.on("data", output);
	socket.proc.stdout.on("data", output);
});

server.listen(8080, function() {
	console.info("Server listening at http://%s:%s", server.address().address, server.address().port);
});
