//====================
//Main Javascript file
//====================

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var movingRight = true;

//This is a class
function boxClass() {

	/*
		You assign values to a class like this

		this.attribute = value,
		this.attribute2 = value2,
		this.lastattribute = value3,
	*/

	this.pos = [0, 0];
	this.spd = [5, 0];
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
}

function drawBox () {

	ctx.fillStyle = "#000";
	ctx.fillRect(box.pos[0], box.pos[1], 20, 20);
}
function drawBox2 () {

	ctx.fillStyle = "#FF0000";
	ctx.fillRect(box2.pos[0], box2.pos[1], 20, 20);
}

function moveBox () {

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	//Move to right
	if (movingRight) { 

		box.pos[0] += box.spd[0];
	};
	//Move to left
	if (!movingRight) { 

		box.pos[0] -= box.spd[0];
	};
	if (box.pos[0] >= canvas.width - 20 || box.pos[0] <= 0) {

		movingRight = !movingRight;
	};
}

function runGame () {

	//Always write move functions before drawing.
	moveBox();

	//Draw Everything to screen
	drawBox();
	drawBox2();
}

var draw = setInterval(runGame, (1000 / 60));