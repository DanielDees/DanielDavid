//====================
//Main Javascript file
//====================

//The HTML5 Canvas element
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var GAME_FPS = 60;

//This is a class
function boxClass() {

	/*
		You assign values to a class like this

		this.attribute = value,
		this.attribute2 = value2,
		this.lastattribute = value3,
	*/

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
	}
}

//To create an instance of the class just do this.
var box2 = new boxClass();

//The box is an object
var box = {

	/*
		You assign values to object like this

		attribute: value,
		attribute2: value2,
		lastattribute: value3,
	*/

	pos: [0, 0],
	spd: [5, 0],

	move: function() {

		if (this.pos[0] <= 0) { 

			this.spd[0] = 5;
		};
		if (this.pos[0] >= canvas.width - 20) { 

			this.spd[0] = -5;
		};

		this.pos[0] += this.spd[0];
		this.pos[1] += this.spd[1];
	}
}

function drawBox () {

	//Color
	ctx.fillStyle = "#000";
	//Rectangle X, Y, width, height
	ctx.fillRect(box.pos[0], box.pos[1], 20, 20);
}
function drawBox2 () {

	//Color
	ctx.fillStyle = "#F00";
	//Rectangle X, Y, width, height
	ctx.fillRect(box2.pos[0], box2.pos[1], 20, 20);
}

function moveBoxes () {

	box.move();
	box2.move();
}

function runGame () {

	//Clears screen before repaint
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	//Always move before drawing.
	moveBoxes();

	//Draw Everything to screen
	drawBox();
	drawBox2();
}

var draw = setInterval(runGame, (1000 / GAME_FPS));

//===========================
//End of main Javascript file
//===========================