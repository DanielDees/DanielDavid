//Server Startup ===========

var express = require('express');
var app = express();
var server = app.listen(3000);
app.use(express.static('public'));

console.log("The server is running");

var socket = require('socket.io');
var io = socket(server);
io.sockets.on('connection', newConnection);

//End Server Startup =======

var users = [];

//Get a user by ID
function getUserByID(id){
	
	for(var i=0; i<users.length; i++){
		
		if(users[i].id == id){
			return users[i];
			break;
		}
	}
	return null;
}

//On user connection
function newConnection(socket) {

	console.log("A new user has connected - ID: " + socket.id);
	users.push(new boxClass(socket.id));

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
				
				break;
			}
		}

		//Update all clients with new user list
		socket.broadcast.emit('userConnection', users);
	}

	//When user moves
	socket.on('moveBox', moveBox);

	function moveBox(data) {

		//console.log("moving serverside");
		for (var i = 0; i < users.length; i++) {
			
			if (users[i].id == data.id) {

				users[i].x = data.x;
				users[i].y = data.y;
				users[i].spd = data.spd;

				//Data contains id and position of user
				socket.broadcast.emit('movement', data);
			}
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
}
