
//CHECK BROWSER TYPE ============
var mie = (navigator.appName == "Microsoft Internet Explorer")?true:false;
//END CHECK BROWSER TYPE ========

document.onkeypress = keyClick;
document.onkeydown = getKeyDown;
document.onkeyup = keyClear;

var keyButton = "";

//Keyboard keys used in game
var keys = {

    W: false,
    A: false,
    S: false,
    D: false,
};

function isEqualTo () {

  //Check if item is not equal to any other being passed.
  for (var i = 1; i < arguments.length; i++) {

    if (arguments[0] == arguments[i]) { return true; }
  }

  return false;
}

//MOUSE AND KEYBOARD =============
function getKeyPressed (e) {

  return String.fromCharCode(e.which || e.keyCode).toUpperCase();
}
function getKeyDown (e) {
  if (e) {
    if (e.keyCode == 8 || e.keyCode == 38 || e.keyCode == 40) { keyClick(e); }
  };
}
function keyClear (e) {

  keyButton = getKeyPressed(e);

  //Movement
  if (isEqualTo(keyButton, "W", "A", "S", "D")) { keys[keyButton] = false; };
}

function keyClick (e) {

  keyButton = getKeyPressed(e);

  //Movement
  if (isEqualTo(keyButton, "W", "A", "S", "D")) { keys[keyButton] = true; };

  e.preventDefault();
}
//END MOUSE AND KEYBOARD =========
