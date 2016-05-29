//====================
//Main Javascript file
//====================

//SERVER CONNECT

var socket = io.connect('http://localhost:3000');

socket.on('boxClass', moveGuestUser);

//END SERVER CONNECT

//The HTML5 Canvas element
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var GAME_FPS = 60;

//Other users are rendered
function moveGuestUser(pos) {

	console.log('IT WORKS!');

	guestUser.pos = pos;
}

var box = new boxClass();
var guestUser = new boxClass();

function boxClass() {

	this.pos = [0, 0];
	this.spd = [0, 5];

	this.move = function() {

		if (this.pos[1] <= 0) { 

			this.spd[1] = 5;
		};
		if (this.pos[1] >= canvas.width - 20) { 

			this.spd[1] = -5;
		};

		this.pos[0] += this.spd[0];
		this.pos[1] += this.spd[1];	

		//Send new position to server.
		socket.emit('boxClass', this.pos);
	}

	this.draw = function() {

		ctx.fillStyle = "#F00";
		ctx.fillRect(this.pos[0], this.pos[1], 20, 20);
	}
}

function runGame () {

	//Clear screen
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	//Move everything
	box.move();

	//Draw everything
	box.draw();
	guestUser.draw();
}

var draw = setInterval(runGame, (1000 / GAME_FPS));

//===========================
//End of main Javascript file
//===========================