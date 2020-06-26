var width;
var height;
var roadWidth;
var segmentLength;
var cameraDepth;

var img;
var canvas;

var grassEven;
var grassOdd;
var rumbleEven;
var rumbleOdd;
var roadEven;
var roadOdd;

var currentPosition;
var startPos;
var playerX;
var speed;
var maxSpeed = 3;
var minSpeed = 0;

var lines = [];

var count = 0;
var imgTemp;

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
		this.scale = cameraDepth/(this.z-camZ);
    	this.X = (1 + this.scale *(this.x - camX)) * width/2;
    	this.Y = (1 - this.scale * (this.y - camY)) * height/2;
    	this.W = this.scale * roadWidth  * width/2;
  	}			
			
  	drawSprite(correction) {
  		if (this.sprite != null) {
			var s = this.sprite;
			
			var w = this.originalSpriteWidth;
			var h = this.originalSpriteHeight;
			// console.log(w +' -- '+h);
			// console.log(' '+this.X +' '+ this.scale +' '+ this.spriteX +' '+ width);
			var destX = this.X + this.scale * this.spriteX * width/2;
			
			var destY = this.Y;
			var destW  = w * this.W / 266;
			var destH  = h * this.W / 266;
			
			// console.log('destW: '+ destW + ' destH: '+ destH +' -- W: '+ this.W +'   destX: '+destX +' destY:'+ destY );
			// destX += destW * this.spriteX + playerX*roadWidth - correction ; //offsetX
			destY -= (destH/5);
			// destY += destH * (-1);    //offsetY
			destX = (this.X - this.W) + (this.scale*this.spriteX);
			// console.log('** destX: '+destX +' destY:'+ destY );

			var clipH = destY+destH-this.clip;
			if (clipH<0) {
				clipH=0;
			}
				
			if (clipH>=destH) {
				s.hide();
			} else {    	
				// s.setTextureRect(IntRect(0,0,this.w,this.h-this.h*clipH/destH));
				// s.size(destW/w,destH/h);
				s.size(50,50);
				s.position(destX, destY);
				s.show();
			}
    	}
    }
};

//draw a rectangle line
function drawQuad(color, x1, y1, w1, x2, y2, w2) {
	fill(color);
	strokeWeight(0);
	//console.log(x1-w1+'-'+y1+'-'+x2-w2+'-'+y2+'-'+x2+w2+'-'+y2+'-'+x1+w1+'-'+y1);
  	quad(x1-w1,y1,x2-w2,y2,x2+w2,y2,x1+w1,y1); 	
}

function preload() {
//   img = loadImage('img/bg.png');
}

function createHiddenImage(path, lineNumber) {
	var newImg = createImg(path);
	//newImg.show();
	console.log(newImg.width +' *** '+ newImg.height);
// 	l.originalSpriteWidth=newImg.width;
// 	l.originalSpriteHeight=newImg.height;
	lineNumber.originalSpriteWidth=1024;
	lineNumber.originalSpriteHeight=372;	
	
	newImg.hide();
	lineNumber.sprite=newImg;
	count++;
	return newImg;
}

function setup() {
	roadWidth = 1700;
	segmentLength = 200;
	cameraDepth = 0.84;
	width = 1024;
	height = 700;
	
	grassEven  = color(16, 200, 16);
	grassOdd  = color(0,154,0);
	rumbleEven = color(255, 255, 255);
	rumbleOdd = color(150,0,30);
	roadEven   = color(107, 107, 107);
	roadOdd   = color(105,105,105);
	
	canvas = createCanvas(width, height);
	canvas.position(0,0);
	
	speed = 0;
	currentPosition = 0;
// 	currentPosition = 204000;
	playerX = 0;
	curve = 0;
	
 	img = createImg("img/bg.png");
	img.position(0,0);
	img.size(width, 372);	
	
	// sprite5 = createHiddenImage("img/5.png");
 	// sprite6 = createHiddenImage("img/6.png");
 	// sprite4 = createHiddenImage("img/4.png");
 	// sprite1 = createHiddenImage("img/1.png");
 	// sprite7 = createHiddenImage("img/7.png");

	for(i=0;i<1600;i++) {
		line = new Line();
		line.z = i*segmentLength;

		if (i>300 && i<700) line.curve=0.5;
		if (i>1100 && i<1400) line.curve=-0.7;

		// if (i<300 && i%20==0) {line.spriteX=-2.5; line.sprite=sprite5;}
		// if (i%17==0)          {line.spriteX=2.0; line.sprite=sprite6;}
		// if (i>300 && i%20==0) {line.spriteX=-0.7; line.sprite=sprite4;}
		// if (i>800 && i%20==0) {line.spriteX=-1.2; line.sprite=sprite1;}
		// if (i==400)           {line.spriteX=-1.2; line.sprite=sprite7;}

		// if (i<300 && i%20==0) {line.spriteX=-2.5; line.sprite=createHiddenImage("img/5.png");}
		// if (i%17==0)          {line.spriteX=2.0; line.sprite=createHiddenImage("img/6.png");}
		// if (i>300 && i%20==0) {line.spriteX=-0.7; line.sprite=createHiddenImage("img/4.png")}
		// if (i>800 && i%20==0) {line.spriteX=-1.2; line.sprite=createHiddenImage("img/1.png")}
		// if (i==400)           {line.spriteX=-1.2; line.sprite=createHiddenImage("img/7.png")}

		if (i<300 && i%20==0) {
			line.spriteX=-2.5;
		}
		if (i%17==0 ) {
			line.spriteX = 2.0;
		}
		if (i>300 && i%20==0) {
			line.spriteX=-0.7;
		}
		if (i>800 && i%20==0) {
			line.spriteX=-1.2;
		}
		if (i==400) {
			line.spriteX=-1.2;
		}
		if (i>750 & i<1410) {
			line.y = sin(i / 30.0) * 1500;
		}
       
		lines.push(line);
	}
	
	// Temp to evaluate the behaviour ouf the sprites
    imgTemp = createHiddenImage("img/7.png", lines[300]);
	lines[300].spriteX = -1.2

    frameRate(20);
    // noLoop();
}

function draw() { 
	maxy = height;
  	N = lines.length;
  	x = 0;
  	dx = 0;
  	H = 1500;
  	
	if (currentPosition/segmentLength > H) {
		console.log('Max pos = '+currentPosition);
		currentPosition=0;
	}
	
	currentPosition += (speed * segmentLength);
	startPos = currentPosition/segmentLength;

  	camH = lines[startPos].y + H;

  	if (keyIsDown(LEFT_ARROW)) {
		playerX -= 1;
	}
	if (keyIsDown(RIGHT_ARROW)) {
    	playerX += 1;
  	}
	if (keyIsDown(UP_ARROW)) {
		currentPosition += segmentLength;
		// speed += 1;
		// if (speed >= maxSpeed) {
		// 	speed = maxSpeed;
		// }
  	}
	if (keyIsDown(DOWN_ARROW)) {
		currentPosition -= segmentLength;
		// speed -= 1;
		// if (speed <= minSpeed) {
		// 	speed = minSpeed;
		// }
	}

	clear();

	for (n=startPos+1; n<startPos+300; n++) {
		l = lines[n%N];
     	l.project(playerX*roadWidth/5-x, camH, (startPos*segmentLength - (n>=N?N*segmentLength:0)));
//      	console.log(' aa '+ playerX*(roadWidth/5)-x +'-'+ camH +' - '+ (startPos*segmentLength - (n>=N?N*segmentLength:0)));
     	x += dx;
    	dx += l.curve;

		l.clip = maxy;
    	if (l.Y >= maxy) { 
    		//alert('maxy');
    		//console.log('maxy ='+ maxy);
		} else {
    		maxy = l.Y;
		
			grass  = n%2 ? grassEven:grassOdd;
			rumble = n%2 ? rumbleEven:rumbleOdd;
			road   = n%2 ? roadEven:roadOdd;

			p = lines[n-1%N];
					
			if (p != null) {
				drawQuad(grass,    0, p.Y, width,    0,   l.Y, width);
				drawQuad(rumble, p.X, p.Y, p.W*1.18,  l.X, l.Y, l.W*1.18);
				drawQuad(road,   p.X, p.Y, p.W,      l.X, l.Y, l.W);
				// console.log('road   '+ round(p.X) +'-'+ round(p.Y)+'-'+ round(p.W)+'    -    '+ round(l.X)+'-'+ round(l.Y)+'-'+ (l.W))
			}

			l.drawSprite(x);
		}	
	}

	// currentPosition += speed;
}

// function keyPressed() {
// 	// alert('pressed');
// 	if (keyCode == LEFT_ARROW) {
//     	playerX -= 1;
//   	} else if (keyCode == RIGHT_ARROW) {
//     	playerX += 1;
//   	} else if (keyCode == UP_ARROW) {
// 		currentPosition += 200;
// 	} else if (keyCode == DOWN_ARROW) {
// 		currentPosition -= 200;
// 	}
// 	redraw();
// }