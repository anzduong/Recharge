// Array of images
var images = [];

// variable that is a function 
var drawFunction;

// load all images into an array
function preload() {
  images[0] = loadImage('assets/one.png');
  images[1] = loadImage('assets/two.png');
  images[2] = loadImage('assets/three.png');
  images[3] = loadImage('assets/four.png');
  images[4] = loadImage('assets/five.png');
  images[5] = loadImage('assets/splash.png');

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
}

// Center drawing, drawFunction will be one for default
function setup() {
  createCanvas(windowWidth, windowHeight);

  // Center our drawing objects
  imageMode(CENTER);
  textAlign(CENTER);
  textSize(24);
  textFont('Futura');

  // set to one for startup
  drawFunction = drawSplash;

}

// Very simple, sets the background color and calls your state machine function
function draw() {
  background('#E3EEFF');

  // will call your state machine function
  drawFunction();
}

//========= TEMPLATE: modify these functions, INSIDE the function blocks only =========

//-- drawRechargeEnergy() will draw the image at index 0 from the array
drawRechargeEnergy = function() {
  frameRate(5);
  image(floor, width/2, height/2 - 50);

  fill('#008DB0');
  textSize(40);
  text("Energy Recharge Stations", width/2, height/8);
  image(barEmpty2, width/2, height/2 - 150);
  image(buttonOff, width/8 - 50, height/2 + 80);

  textSize(24);
  text('Click to charge!', width/8 - 50, height/2 + 40)

  if (mouseIsPressed) {
    image(tubes, width/2, height/2 + 100);
    click();
  }

  else {
    image(tubes, width/2, height/2 + 100);
    image(imgOutside, width/2 + 50, height/2 + 155);
  }
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

//-- drawSnackMachine() will draw the image at index 1 from the array
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
  text("Happy Chemical Snack Machine", width/2, height/8);


  if(mouseIsPressed) {
    click2();
    animation(aniSnackButton, width/2 + 182, height/2 - 45);
    healthBar();

  }
  else{
    healthBar();
    image(snackFull,width/2 - 25, height/2 - 55);
  }

}

function healthBar() {
  fill(0);
  textSize(24);
  text('Dopamine Levels: ', width/2 + 400, height/2 + 55);
  text('Serotonin Levels: ', width/2 + 400, height/2 - 115);
  text('Endorphins Levels: ', width/2 + 400, height/2 - 30);
  text('Endorphins Levels: ', width/2 + 400, height/2 - 200);

}

function click2() {
  let button2 = dist(mouseX, mouseY, width/2 + 182, height/2 - 45);
  if (button2 <= 50) {
    imageMode(CENTER);
    image(snackMissing,width/2 - 25, height/2 - 55);
    animation(aniBar2, width/2 + 400, height/2 - 85);
  }
}
//-- drawRechargeEnergy() will draw the image at index 2 from the array
drawThree = function() {
  fill(0);
  rect(200,200,width/2,height/2);
}


//-- drawSplash() will draw the image at index 4 from the array
drawSplash = function() {
   image(images[5],width/2, height/2);
}


// Change the drawFunction variable based on your interaction
function keyTyped() {
  if( drawFunction === drawSplash ) {
    return;
  }

  if( key === '1' ) {
  	drawFunction = drawRechargeEnergy;
  }
  else if( key === '2' ) {
  	drawFunction = drawSnackMachine;
  }
  else if( key === '3' ) {
  	drawFunction = drawThree;
  }
  else if( key === 's' ) {
    drawFunction = drawSplash;
  }
}

function mousePressed() {
  // only change state if we are in splash screen
  if( drawFunction === drawSplash ) {
    drawFunction = drawRechargeEnergy;
  }
}