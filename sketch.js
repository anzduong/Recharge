// Array of images
var images = [];

// variable that is a function 
var drawFunction;

// global variables for drawIntro()
var midX;
var startY;
var lineHeight1 = 80;

// create hover
var gHover = 0;
var hoverSpeed = 2;

// offset from bottom of screen
var gTextOffset = 40;
var gTextOffset2 = 550;

// string for variable intro message
var intro = ["Hi, Welcome!", " Hope You're In A Good Mood!", "If Not...", 
"I Know What You Need", "Click Anywhere To Begin"];

// load all images into an array
function preload() {

  // specify width and height of each frame and number of frames
  aniBar = loadAnimation('assets/barEmpty.png', 'assets/bar25.png','assets/bar50.png', 'assets/bar75.png','assets/bar100.png');
  imgOutside = loadImage('assets/peopleOutside.png');
  imgWalk = loadImage('assets/peopleWalking.png');
  imgInside = loadImage('assets/peopleInside.png');

  aniBar2 = loadAnimation('assets/bar25copy.png', 'assets/bar50copy.png');

  barEmpty = loadImage('assets/barEmptycopy.png')
  bar25 = loadImage('assets/bar25copy.png');
  bar50 = loadImage('assets/bar50copy.png');
  bar75 = loadImage('assets/bar75copy.png');
  bar100 = loadImage('assets/bar100copy.png');
  
  aniSnackButton = loadAnimation('assets/buttons.png', 'assets/buttonsBlink.png')
  
  floor = loadImage('assets/floor.png');
  tubes = loadImage('assets/tubes2.png');
  door = loadImage('assets/door.png')
  barEmpty2 = loadImage('assets/barEmpty2.png');

  snackMachine = loadImage('assets/snackMachine.png');
  snackFull = loadImage('assets/snackFull.png')
  snackMissing = loadImage('assets/snackMissing.png')
  plant = loadImage('assets/plant.png');
  snack = loadImage('assets/snack.png');

  buttonOn = loadImage('assets/buttonOn.png');
  buttonOff = loadImage('assets/buttonOff.png');

  assemblyLine = loadImage('assets/assemblyLine.png');
  aniBottles = loadAnimation('assets/bottles3.png','assets/bottles2.png', 'assets/bottles1.png')
}

// Center drawing, drawFunction will be one for default
function setup() {
  createCanvas(windowWidth, windowHeight);

  // Center our drawing objects
  imageMode(CENTER);
  textAlign(CENTER);
  textSize(24);
  textFont('Spicy Rice');

  // set to one for startup
  drawFunction = drawIntro;

    a = height/2 + 200;

}

// Very simple, sets the background color and calls your state machine function
function draw() {
  background('#E3EEFF');

  // will call your state machine function
  drawFunction();

  // draw hover effect
  drawHover();

}

function drawLine() {
  stroke(255);
  strokeWeight(30);

  line(0, a, width, a);
  a = a - 2;
  if (a < 0) {
    a = height;
  }
}

//-- drawIntro() will displays instructions 
drawIntro = function() {

  frameRate(2);

  col1 = random(147);
  col2 = random(172);
  col3 = random(210);

  // randomizes background color
  background(col1, col2, col3);

  // position text
  midX = width/2;
  startY = height/4;

  fill('#ffffff');
  textSize(55);

  // parse though string array to print title string
  for ( let i = 0; i < intro.length; i++ ) {
    text(intro[i], midX, startY + (i * lineHeight1) + gHover);
  }
  return;
}

// creates hover effect
drawHover = function() {
  gHover = gHover + hoverSpeed;

  if ( gHover > 10 || gHover < -10 ) {
    hoverSpeed = hoverSpeed * -1;
  }
}

//-- drawRechargeEnergy() us the first sketch
drawRechargeEnergy = function() {

  frameRate(5);
  image(floor, width/2, height/2 - 50);

  fill('#008DB0');
  textSize(40);
  noStroke();
  text("Energy Recharge Stations", width/2, height/8 + gHover);
  image(barEmpty2, width/2, height/2 - 150);
  image(buttonOff, width/8 - 50, height/2 + 80);

  textSize(24);
  text('Click to Charge!', width/8 - 50 + gHover, height/2 + 40)


  if (mouseIsPressed) {
    image(tubes, width/2, height/2 + 100);
    click();
  }

  else {
    image(tubes, width/2, height/2 + 100);
    image(imgOutside, width/2 + 50, height/2 + 155);
  }

  drawLine();

  textSize(30);
  fill(0);
  noStroke();
  text('Press #1-3 to Change Pages', width/2 + gHover, height - gTextOffset2);
}

function click() {
  let button = dist(mouseX, mouseY, width/8 - 50, height/2 + 80);
  if (button <= 50) {
    imageMode(CENTER);
    animation(aniBar, width/2, height/2 - 150);
    image(buttonOn, width/8 - 50, height/2 + 80);
    image(imgInside, width/2, height/2 + 50);
    image(door, width/2, height/2 + 120);

  }
}

//-- drawSnackMachine is the second sketch
drawSnackMachine = function() {
  image(plant, width/2, height/2 - 50);
  image(snackMachine,width/2, height/2);
  animation(aniSnackButton, width/2 + 182, height/2 - 45);

  image(bar25, width/2 + 400, height/2 + 85);
  image(bar25, width/2 + 400, height/2 - 85);
  image(bar50, width/2 + 400, height/2);
  image(bar75, width/2 + 400, height/2 - 170);

  fill('#008DB0');
  textSize(40);
  text("Happy Chemical Snack Machine", width/2, height/8 + gHover);


  if(mouseIsPressed) {
    click2();
    animation(aniSnackButton, width/2 + 182, height/2 - 45);
    healthBar();

  }
  else{
    healthBar();
    image(snackFull,width/2 - 25, height/2 - 55);
  }

  textSize(30);
  fill(0);
  text('Press #1-3 to Change Pages', width/2 + gHover, height - gTextOffset);

}

// prints levels status
function healthBar() {
  fill(0);
  textSize(24);
  text('Dopamine Levels: ', width/2 + 400 + gHover, height/2 + 55);
  text('Serotonin Levels: ', width/2 + 400 + gHover, height/2 - 115);
  text('Endorphins Levels: ', width/2 + 400 + gHover, height/2 - 30);
  text('Endorphins Levels: ', width/2 + 400 + gHover, height/2 - 200);

}

// create clickale button for page 2
function click2() {
  let button2 = dist(mouseX, mouseY, width/2 + 182, height/2 - 45);
  if (button2 <= 50) {
    imageMode(CENTER);
    image(snackMissing,width/2 - 25, height/2 - 55);
    animation(aniBar2, width/2 + 400, height/2 - 85);
  }
}


//-- drawFactory is the last sketch
drawFactory = function() {
  fill('#008DB0');
  textSize(40);
  text("Happy Chemical Factory", width/2, height/8 + gHover);
  image(assemblyLine, width/2, height/2 - 50);
  image(buttonOff, width/2 + 400, height/2 - gTextOffset - 40);

  textSize(24);
  fill(0);
  text('Click to Start the Assembly Line!', width/2 + 400 + gHover, height/4 + 40)

  if (mouseIsPressed) {
    click3();
    image(buttonOn, width/2 + 400, height/2 - gTextOffset - 40);
  }

  textSize(30);
  fill(0);
  text('Press #1-3 to Change Pages', width/2 + gHover, height - gTextOffset2);
}

// create clickable button for page 3
function click3() {
  let button = dist(mouseX, mouseY, width/2 + 400, height/2 - gTextOffset - 40);
  if (button <= 50) {
    imageMode(CENTER);
    animation(aniBottles, width/2 + 20, height/2 + 150);
  }
}


// Change the drawFunction variable based on your interaction
function keyTyped() {
  if( drawFunction === drawIntro ) {
    return;
  }
  if( key === '1' ) {
  	drawFunction = drawRechargeEnergy;
  }
  else if( key === '2' ) {
  	drawFunction = drawSnackMachine;
  }
  else if( key === '3' ) {
  	drawFunction = drawFactory;
  }
  else if( key === 'i' ) {
    drawFunction = drawIntro;
  }
}

function mousePressed() {
  // only change state if we are in splash screen
  if( drawFunction === drawIntro ) {
    drawFunction = drawRechargeEnergy;
  }
}