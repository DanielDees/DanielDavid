var express = require('express');

var app = express();

var server = app.listen(3000);

app.use(express.static('public'));

console.log("The server is running");

var socket = require('socket.io');
var io = socket(server);

io.sockets.on('connection', newConnection);

//On user connection
function newConnection(socket) {

	console.log("A new user has connected - ID: " + socket.id);

	//Get info from boxClass and send data to moveBox
	socket.on('boxClass', moveBox);

	function moveBox(pos) {

		console.log("Server recieved: " + pos);

		//Send information out to all users
		socket.broadcast.emit('boxClass', pos);
	}
}