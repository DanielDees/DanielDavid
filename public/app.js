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
	
	//Clear old users out
	users = [];

	//Add new users in.
	console.log(userList);

	for (var i = 0; i < userList.length; i++) {
		
		users[i] = new boxClass(userList[i].id, userList[i].x, userList[i].y, userList[i].spd);
	}

	console.log("Player: " + users[users.length - 1].id + " has connected!");
}
function boxClass(idGiven, x, y, spd, color) {

	//PlayerID
	this.id = idGiven || "No id Found!";

	this.color == color || "#000";

	//Position
	this.x = x || 0;
	this.y = y || 0;

	this.width = 20;
	this.height = 20;

	//Speed
	this.spd = spd || 5;

	this.getData = function() {

		var data = {

			id: this.id,

			x: this.x,
			y: this.y,
		}

		return data;
	}
 	
 	//Movement
	this.move = function() {

		var MAX_Y = canvas.height - 20;
		var MAX_X = canvas.width - 25;

		if (this.y < MAX_Y && keys.S) { 

			this.y += this.spd;
		};
		if (this.y > 0 && keys.W) {

			this.y -= this.spd;
		};
		if (this.x < MAX_X && keys.D) { 

			this.x += this.spd;
		};
		if (this.x > 0 && keys.A) { 

			this.x -= this.spd;
		};

		//Send new position to server.
		socket.emit('moveBox', this.getData());
	};

	//Hitbox
  	this.top = function() { return this.Y; }
  	this.bottom = function() { return this.Y + this.height; }
  	this.left = function() { return this.X; }
  	this.right = function() { return this.X + this.width; }

	//Rendering
	this.draw = function() {

		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	};
}

function movePlayer() {

	//Move player
	for (var i = 0; i < users.length; i++) {
		if (users[i].id == playerID) { users[i].move(); }
	}
}
function drawPlayer() {

	//Draw player
	for (var i = 0; i < users.length; i++) {
		if (users[i].id == playerID) { 

			users[i].color = "#0C0";
			users[i].draw(); 
			//console.log(playerID + " == " + users[i].id); 
		}
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

	for (var i = 0; i < users.length; i++) { 
		if (users[i].id != playerID) { 

			users[i].color = "#FF0";
			users[i].draw(); 
			//console.log(playerID + " != " + users[i].id); 
		}
	}
}
function runGame () {

	//Clear screen
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	//Display players online
	ctx.font = "18px Arial";
	ctx.fillStyle = "#0C0";
	ctx.fillText("Players Online: " + users.length, canvas.width - 160, 30);
	ctx.fillText("Last Keypress: " + keyButton, canvas.width - 160, 50);

	//Move Users
	movePlayer();

	//Draw everything
	
	drawUsers();
	drawPlayer();
}

var draw = setInterval(runGame, (1000 / GAME_FPS));

//===========================
//End of main Javascript file
//===========================