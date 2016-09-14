//Server Startup ===========

var express = require('express');
var app = express();
var server = app.listen(3000);
app.use(express.static('public'));

console.log("The server is running (Port 3000)");

var socket = require('socket.io');
var io = socket(server);
io.sockets.on('connection', newConnection);

//End Server Startup =======

var users = [];

//Get a user by ID
function getUserByID(id){
	
	for (var i = 0; i < users.length; i++) {
		
		if (users[i].id == id) {

			return users[i];
		}
	}
	
	return null;
}

//On user connection
function newConnection(socket) {

	console.log("A new user has connected - ID: " + socket.id);
	users.push(new boxClass(socket.id, 50, 50, 0));

	//Log number of users online
	console.log("Users online: " + users.length);

	//Send user ID to person connecting
	socket.emit('socketID', socket.id);

	//Send user list to person connecting
	socket.emit('userConnection', users);

	//Send user ID to all connected clients
	socket.broadcast.emit('userConnection', users);

	//On user disconnect
	socket.on('disconnect', disConnection);

	function disConnection() {

		for (var i = 0; i < users.length; i++) {
			if (users[i].id == socket.id) { 

				//Remove user from user list
				users.splice(i, 1);

				console.log("A user has dis-connected - ID: " + socket.id);
				console.log("Users online: " + users.length);
				
				break;
			}
		}

		//Update all clients with new user list
		io.sockets.emit('userConnection', users);
	}

	//When user moves
	socket.on('moveBox', moveBox);

	function moveBox(data) {

		//console.log("moving serverside");
		for (var i = 0; i < users.length; i++) {
			
			if (users[i].id == data.id) {

				users[i].x = data.x;
				users[i].y = data.y;

				//data.id = "Other Player";

				//Data contains id and position of user
				io.sockets.emit('movement', data);
			}
		}
	}
}

function boxClass(idGiven, x, y, spd, color) {

	//PlayerID
	this.id = idGiven || "No id Found!";

	this.color = color || "#000";

	//Position
	this.x = x || 0;
	this.y = y || 0;

	this.width = 20;
	this.height = 20;

	//Speed
	this.spd = spd || 5;
 	
 	//Movement
	this.move = function() {

		var MAX_Y = canvas.height - 20;
		var MAX_X = canvas.width - 25;

		if (this.y < MAX_Y && keys.S) { 

			this.y += this.spd;
		}
		if (this.y > 0 && keys.W) {

			this.y -= this.spd;
		}
		if (this.x < MAX_X && keys.D) { 

			this.x += this.spd;
		}
		if (this.x > 0 && keys.A) { 

			this.x -= this.spd;
		}

		var data = {

			id: this.id,
			x: this.x,
			y: this.y,
		}

		//Send new position to server.
		socket.emit('moveBox', data);
	}

	//Hitbox
  	this.top = function() { return this.Y; }
  	this.bottom = function() { return this.Y + this.height; }
  	this.left = function() { return this.X; }
  	this.right = function() { return this.X + this.width; }

	//Rendering
	this.draw = function() {

		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}
