//====================
//Main Javascript file
//====================

//SERVER CONNECT

var socket = io.connect('http://localhost:3000');
socket.on('socketID', assignPlayerID);

socket.on('movement', moveUsers);
socket.on('userConnection', updateUserList);

//END SERVER CONNECT

//The HTML5 Canvas element
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var GAME_FPS = 60;

var playerID;
var users = [];

function assignPlayerID(id) {

	playerID = id;
	console.log("Your ID: " + playerID);
}
function updateUserList(userList) {

	console.log(userList);

	for (var i = 0; i < userList.length; i++) {
		
		users[i] = new boxClass(userList[i].id, userList[i].x, userList[i].y);
	}

	console.log("Guest player: " + users[users.length - 1].id + " has connected!");
}
function boxClass(idGiven, x, y) {

	//PlayerID
	this.id = idGiven || "No id Found!";

	//Position
	this.x = x || 0;
	this.y = y || 0;

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

function movePlayer() {

	//Move player
	for (var i = 0; i < users.length; i++) {
		if (users[i].id == playerID) { users[i].move(); }
	}
}
//Other users are updated
function moveUsers(data) {

	//Update all user positions to server user location.
	for (var i = 0; i < users.length; i++) {
		if (users[i].id == data.id) { 

			users[i].x = data.x;
			users[i].y = data.y; 
		}
	}
}
function drawUsers() {

	for (var i = 0; i < users.length; i++) { users[i].draw(); }
}
function runGame () {

	//Clear screen
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	//Display players online
	ctx.font = "18px Arial";
	ctx.fillText("Players Online: " + users.length, 340, 30);

	//Move Users
	movePlayer();

	//Draw everything
	drawUsers();
}

var draw = setInterval(runGame, (1000 / GAME_FPS));

//===========================
//End of main Javascript file
//===========================