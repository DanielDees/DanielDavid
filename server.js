//Server Startup ===========

var express = require('express');
var app = express();
var server = app.listen(3000);
app.use(express.static('public'));

console.log("The server is running");

var socket = require('socket.io');
var io = socket(server);
io.sockets.on('connection', newConnection);
//io.sockets.on('disconnect', disConnection);

//End Server Startup =======

var users = [];

//On user connection
function newConnection(socket) {

	console.log("A new user has connected - ID: " + socket.id);
	users.push(new boxClass(socket.id));

	console.log(new boxClass(socket.id));

	//Send user ID to person connecting
	socket.emit('socketID', socket.id);

	//Send user list to person connecting
	socket.emit('userConnection', users);

	//Send user ID to all connected clients
	socket.broadcast.emit('userConnection', users);
}
function disConnection(socket) {

	console.log("User has disconnected - ID: " + socket.id);

	//Remove user from list
	for (var i = 0; i < users.length; i++) {
		if (users[i].id == data.id) { users.splice(i, 1); }
	}
}

function moveBox(data) {

	for (var i = 0; i < users.length; i++) {
		
		if (users[i].id == data.id) {

			users[i].x = data.x;
			users[i].y = data.y;

			//Data contains id and position of user
			socket.broadcast.emit('movement', data);
		}
	}
}
function boxClass(idGiven) {

	//PlayerID
	this.id = idGiven || "No id Found!";

	//Position
	this.x = 0;
	this.y = 0;

	//Speed
	this.spd = [0, 5];
 	
 	//Movement
	this.move = function() {

		if (this.y <= 0) { 

			this.spd[1] = 5;
		};
		if (this.y >= canvas.width - 20) { 

			this.spd[1] = -5;
		};

		this.x += this.spd[0];
		this.y += this.spd[1];

		var data = {

			id: this.id,
			x: this.x,
			y: this.y,
		};

		//Send new position to server.
		socket.emit('moveBox', data);
	};

	//Rendering
	this.draw = function() {

		ctx.fillStyle = "#F00";
		ctx.fillRect(this.x, this.y, 20, 20);
	};
}