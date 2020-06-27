var width;
var height;
var roadWidth;
var segmentLength;
var cameraDepth;

var img;
var canvas;

var grassEvenColor;
var grassOddColor;
var rumbleEvenColor;
var rumbleOddColor;
var roadEvenColor;
var roadOddColor;

var currentPosition;
var startPos;
var playerX;
var playerSpeed;
var maxSpeed = 3;
var minSpeed = 0;
var speedArray = [0, 1, 3, 5];

var lines = [];

var imgTemp;

var debug = false;

class Line {
	constructor() {
		//center of line
		this.x = 0;
		this.y = 0;
		this.z = 0;
		//coordinates
		this.X = 0;
		this.Y = 0;
		this.W = 0;
		//special tags
		this.curve = 0;
		this.spriteX = 0;
		this.clip = 0;
		this.scale = 0;
		this.sprite = null;
		this.originalSpriteWidth;
		this.originalSpriteHeight;
	}

	project(camX, camY, camZ) {
		this.scale = cameraDepth / (this.z - camZ);
		this.X = (1 + this.scale * (this.x - camX)) * width / 2;
		this.Y = (1 - this.scale * (this.y - camY)) * height / 2;
		this.W = this.scale * roadWidth * width / 2;
	}

	drawSprite(correction) {
		if (this.sprite != null) {
			var sprite = this.sprite;

			var w = this.originalSpriteWidth;
			var h = this.originalSpriteHeight;

			var destX = this.X + this.scale * this.spriteX * width / 2;

			var destY = this.Y;
			var destW = w * this.W / 266;
			var destH = h * this.W / 266;

			destY -= (destH / 5);
			destX = (this.X - this.W) + (this.scale * this.spriteX);
			// destX += destW * this.spriteX + playerX*roadWidth - correction ; //offsetX

			var clipH = destY + destH - this.clip;
			if (clipH < 0) {
				clipH = 0;
			}

			if (clipH >= destH) {
				sprite.hide();
			} else {
				// sprite.setTextureRect(IntRect(0,0,this.w,this.h-this.h*clipH/destH));
				// sprite.size(destW/w,destH/h);
				sprite.size(25, 25);
				sprite.position(destX, destY);
				sprite.show();
			}
		}
	}
};

function preload() {
	// img = loadImage('img/bg/bg.png');
}

function setup() {
	roadWidth = 1700;
	segmentLength = 200;
	cameraDepth = 0.84;
	width = 1024;
	height = 700;

	grassEvenColor = color(16, 200, 16);
	grassOddColor = color(0, 154, 0);
	rumbleEvenColor = color(255, 255, 255);
	rumbleOddColor = color(150, 0, 30);
	roadEvenColor = color(107, 107, 107);
	roadOddColor = color(105, 105, 105);

	canvas = createCanvas(width, height);
	canvas.position(0, 0);

	playerSpeed = 0;
	currentPosition = 0;
	// 	currentPosition = 204000;
	playerX = 0;
	curve = 0;

	img = createImg("img/bg/bg.png");
	img.position(0, 0);
	img.size(width, 372);
	img.show();

	// sprite5 = createHiddenImage("img/sprites/5.png");
	// sprite6 = createHiddenImage("img/sprites/6.png");
	// sprite4 = createHiddenImage("img/sprites/4.png");
	// sprite1 = createHiddenImage("img/sprites/1.png");
	// sprite7 = createHiddenImage("img/sprites/7.png");

	for (i = 0; i < 1600; i++) {
		line = new Line();
		line.z = i * segmentLength;

		if (i > 300 && i < 700) line.curve = 0.5;
		if (i > 1100 && i < 1400) line.curve = -0.7;

		// if (i<300 && i%20==0) {line.spriteX=-2.5; line.sprite=sprite5;}
		// if (i%17==0)          {line.spriteX=2.0; line.sprite=sprite6;}
		// if (i>300 && i%20==0) {line.spriteX=-0.7; line.sprite=sprite4;}
		// if (i>800 && i%20==0) {line.spriteX=-1.2; line.sprite=sprite1;}
		// if (i==400)           {line.spriteX=-1.2; line.sprite=sprite7;}

		// if (i<300 && i%20==0) {line.spriteX=-2.5; line.sprite=createHiddenImage("img/sprites/5.png");}
		// if (i%17==0)          {line.spriteX=2.0; line.sprite=createHiddenImage("img/sprites/6.png");}
		// if (i>300 && i%20==0) {line.spriteX=-0.7; line.sprite=createHiddenImage("img/sprites/4.png")}
		// if (i>800 && i%20==0) {line.spriteX=-1.2; line.sprite=createHiddenImage("img/sprites/1.png")}
		// if (i==400)           {line.spriteX=-1.2; line.sprite=createHiddenImage("img/sprites/7.png")}

		if (i < 300 && i % 20 == 0) {
			line.spriteX = -2.5;
		}
		if (i % 17 == 0) {
			line.spriteX = 2.0;
		}
		if (i > 300 && i % 20 == 0) {
			line.spriteX = -0.7;
		}
		if (i > 800 && i % 20 == 0) {
			line.spriteX = -1.2;
		}
		if (i == 400) {
			line.spriteX = -1.2;
		}
		if (i > 750 & i < 1410) {
			line.y = sin(i / 30.0) * 1500;
		}

		lines.push(line);
	}

	// Temp to evaluate the behaviour ouf the sprites
	imgTemp = createHiddenImage("img/sprites/7.png", lines[300]);
	lines[300].spriteX = -1.2

	if (debug) {
		noLoop();
	} else {
		frameRate(20);
	}
}

function draw() {
	maxy = height;
	N = lines.length;
	x = 0;
	dx = 0;
	H = 1500;

	if (currentPosition / segmentLength > H) {
		console.log('Max pos = ' + currentPosition);
		currentPosition = 0;
	}

	currentPosition += (speedArray[playerSpeed] * segmentLength);
	startPos = currentPosition / segmentLength;

	camH = lines[startPos].y + H;

	moveKeyIsDown();

	clear();

	for (n = startPos + 1; n < startPos + 300; n++) {
		currentLine = lines[n % N];
		currentLine.project(playerX * roadWidth / 5 - x, camH, (startPos * segmentLength - (n >= N ? N * segmentLength : 0)));

		x += dx;
		dx += currentLine.curve;

		currentLine.clip = maxy;
		if (currentLine.Y <= maxy) {
			maxy = currentLine.Y;

			grassColor = n % 2 ? grassEvenColor : grassOddColor;
			rumbleColor = n % 2 ? rumbleEvenColor : rumbleOddColor;
			roadColor = n % 2 ? roadEvenColor : roadOddColor;

			previousLine = lines[n - 1 % N];

			if (previousLine != null) {
				drawQuad(grassColor, 0, previousLine.Y, width, 0, currentLine.Y, width);
				drawQuad(rumbleColor, previousLine.X, previousLine.Y, previousLine.W * 1.18, currentLine.X, currentLine.Y, currentLine.W * 1.18);
				drawQuad(roadColor, previousLine.X, previousLine.Y, previousLine.W, currentLine.X, currentLine.Y, currentLine.W);
			}

			currentLine.drawSprite(x);
		}
	}
	drawTextWithBorder(rumbleEvenColor, rumbleOddColor, "Speed: "+ speedArray[playerSpeed]*10, 0, 410);
}

function brake() {
	playerSpeed -= 1;
	if (playerSpeed <= minSpeed) {
		playerSpeed = minSpeed;
	}
}

function acelerate() {
	playerSpeed += 1;
	if (playerSpeed >= maxSpeed) {
		playerSpeed = maxSpeed;
	}
}

function moveRight() {
	playerX += 1;
}

function moveLeft() {
	playerX -= 1;
}

//Used when running normally (not debug)
function moveKeyIsDown() {
	if (debug) {
		return;
	}
	if (keyIsDown(LEFT_ARROW)) {
		moveLeft();
	}
	if (keyIsDown(RIGHT_ARROW)) {
		moveRight();
	}
	if (keyIsDown(UP_ARROW)) {
		acelerate();
	}
	if (keyIsDown(DOWN_ARROW)) {
		brake();
	}
}

//Used when doing debug
function keyPressed() {
	if (!debug) {
		return;
	}
	if (keyCode == LEFT_ARROW) {
    	moveLeft();
  	} else if (keyCode == RIGHT_ARROW) {
    	moveRight();
  	} else if (keyCode == UP_ARROW) {
		acelerate();
	} else if (keyCode == DOWN_ARROW) {
		brake();
	}
	redraw();
}