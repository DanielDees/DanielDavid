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

	users = userList;
	console.log("Guest player: " + users[users.length - 1].id + " has connected!");
}

//Other users are updated
function moveUsers(data) {

	for (var i = 0; i < users.length; i++) {

		if (users[i].id == data.id) { 

			users[i].x = data.x;
			users[i].y = data.y;
		}
	}
}
function drawUsers() {

	for (var i = 0; i < users.length; i++) { 

		users[i].draw(); 
	}
}
function runGame () {

	//Clear screen
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	//Display players online
	ctx.font = "18px Arial";
	ctx.fillText("Players Online: " + users.length, 340, 30);

	//Draw everything
	drawUsers();
}

var draw = setInterval(runGame, (1000 / GAME_FPS));

//===========================
//End of main Javascript file
//===========================