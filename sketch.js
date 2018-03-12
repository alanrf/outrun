var width;
var height;
var roadW;
var segL; //segment length
var camD; //camera depth

var img;
var canvas;

var grass1;
var grass2;
var rumble1;
var rumble2;
var road1;
var road2;

var pos;
var startPos;
var playerX;
var speed;

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
		this.scale = camD/(this.z-camZ);
    	this.X = (1 + this.scale *(this.x - camX)) * width/2;
    	this.Y = (1 - this.scale * (this.y - camY)) * height/2;
    	this.W = this.scale * roadW  * width/2;
  	}			
			
  	drawSprite(correction) {
  		if (this.sprite != null) {

    	var s = this.sprite;
    	
    	var w = this.originalSpriteWidth;
    	var h = this.originalSpriteHeight;
// 		console.log(w +' -- '+h);
// 		console.log(' '+this.X +' '+ this.scale +' '+ this.spriteX +' '+ width);
    	var destX = this.X + this.scale * this.spriteX * width/2;
    	
    	var destY = this.Y;
    	var destW  = w * this.W / 266;
    	var destH  = h * this.W / 266;
    	
    	

		console.log('destW: '+ destW + ' destH: '+ destH +' -- W: '+ this.W +'   destX: '+destX +' destY:'+ destY );
//     	destX += destW * this.spriteX + playerX*roadW - correction ; //offsetX
    	destY -= (destH/5);
//     	destY += destH * (-1);    //offsetY
destX = (this.X - this.W) + (this.scale*this.spriteX);
    	console.log('** destX: '+destX +' destY:'+ destY );
    	
      	//console.log('destW: '+ destW + ' destH: '+ destH +' -- W: '+ this.W +'   destX: '+destX +' destY:'+ destY );		

    	var clipH = destY+destH-this.clip;
    	if (clipH<0) clipH=0;
			
    	if (clipH>=destH) {
    		s.hide();
    	} else {
    	
//     	s.setTextureRect(IntRect(0,0,this.w,this.h-this.h*clipH/destH));
//     	s.size(destW/w,destH/h);
		s.size(50,50);
    	s.position(destX, destY);
    	s.show();
    	}
    	}
    }
};

//draw a rectangle line
function drawQuad(c, x1, y1, w1, x2, y2, w2) {
	fill(c);
	strokeWeight(0);
	//console.log(x1-w1+'-'+y1+'-'+x2-w2+'-'+y2+'-'+x2+w2+'-'+y2+'-'+x1+w1+'-'+y1);
  	quad(x1-w1,y1,x2-w2,y2,x2+w2,y2,x1+w1,y1); 	
}

function preload() {
//   img = loadImage('img/bg.png');
}

function createHiddenImage(path, l) {
	var newImg = createImg(path);
	//newImg.show();
	console.log(newImg.width +' *** '+ newImg.height);
// 	l.originalSpriteWidth=newImg.width;
// 	l.originalSpriteHeight=newImg.height;
	l.originalSpriteWidth=1024;
	l.originalSpriteHeight=372;	
	
	newImg.hide();
	l.sprite=newImg;
	count++;
	return newImg;
}

function setup() {
	roadW = 1700;
// 	roadW = 1700/5;
	segL = 200; //segment length
	camD = 0.84;
	width = 1024;
	height = 700; //768;
	
	grass1  = color(16, 200, 16);
	grass2  = color(0,154,0);
	rumble1 = color(255, 255, 255);
	rumble2 = color(150,0,30);
	road1   = color(107, 107, 107);
	road2   = color(105,105,105);
	
	canvas = createCanvas(width, height);
	canvas.position(0,0);
	
	pos = 0;
// 	pos = 204000;
	playerX = 0;
	curve = 0;
	
 	img = createImg("img/bg.png");
	
	img.position(0,0);
// 	img.size(width, 400);
	img.size(width, 372);	
	
	// sprite5 = createHiddenImage("img/5.png");
//  	sprite6 = createHiddenImage("img/6.png");
//  	sprite4 = createHiddenImage("img/4.png");
//  	sprite1 = createHiddenImage("img/1.png");
//  	sprite7 = createHiddenImage("img/7.png");
// 	
	//
	for(i=0;i<1600;i++) {
       line = new Line();
       line.z = i*segL;

       if (i>300 && i<700) line.curve=0.5;
       if (i>1100 && i<1400) line.curve=-0.7;

       // if (i<300 && i%20==0) {line.spriteX=-2.5; line.sprite=sprite5;}
//        if (i%17==0)          {line.spriteX=2.0; line.sprite=sprite6;}
//        if (i>300 && i%20==0) {line.spriteX=-0.7; line.sprite=sprite4;}
//        if (i>800 && i%20==0) {line.spriteX=-1.2; line.sprite=sprite1;}
//        if (i==400)           {line.spriteX=-1.2; line.sprite=sprite7;}

// 	   if (i<300 && i%20==0) {line.spriteX=-2.5; line.sprite=createHiddenImage("img/5.png");}
//        if (i%17==0)          {line.spriteX=2.0; line.sprite=createHiddenImage("img/6.png");}
//        if (i>300 && i%20==0) {line.spriteX=-0.7; line.sprite=createHiddenImage("img/4.png")}
//        if (i>800 && i%20==0) {line.spriteX=-1.2; line.sprite=createHiddenImage("img/1.png")}
//        if (i==400)           {line.spriteX=-1.2; line.sprite=createHiddenImage("img/7.png")}

	   if (i<300 && i%20==0) {line.spriteX=-2.5;}
       if (i%17==0)          {line.spriteX=2.0;}
       if (i>300 && i%20==0) {line.spriteX=-0.7;}
       if (i>800 && i%20==0) {line.spriteX=-1.2;}
       if (i==400)           {line.spriteX=-1.2;}


       if (i>750&i<1410) line.y = sin(i/30.0)*1500;
       
       lines.push(line);
     }
     
     imgTemp=createHiddenImage("img/7.png", lines[100]);
     lines[100].spriteX=-1.2
     
     
//      frameRate(50);
    noLoop();
}

function draw() { 
  	maxy = height;
  	N = lines.length;
  	x = 0;
  	dx = 0;
  	H = 1500;
  	
  	if(pos/segL > H) {
  		//console.log('Max pos = '+pos);
  		pos=0;
  	}
  	
  	startPos = pos/segL;
  	
  	camH = lines[startPos].y + H;

//   	if (keyIsDown(LEFT_ARROW)) {
// 		playerX -= 1;
// 	}
// 	if (keyIsDown(RIGHT_ARROW)) {
//     	playerX += 1;
//   	}
// 	if (keyIsDown(UP_ARROW)) {
// 		pos += 200;
//   	}
// 	if (keyIsDown(DOWN_ARROW)) {
//     	pos -= 200;
// 	}
	clear();

// 	drawQuad(road1,   255, 512, 3655,      512, 1452, 1827);
// 	drawQuad(road2,   1452, 512, 1827,      512, 1085, 1218);
// 	drawQuad(road1,   1085, 512, 1218,      512, 901, 913);

	for (n=startPos+1; n<startPos+300; n++) {
		l = lines[n%N];
     	l.project(playerX*roadW/5-x, camH, (startPos*segL - (n>=N?N*segL:0)));
//      	console.log(' aa '+ playerX*(roadW/5)-x +'-'+ camH +' - '+ (startPos*segL - (n>=N?N*segL:0)));
     	x+=dx;
    	dx+=l.curve;

		l.clip=maxy;
    	if (l.Y>=maxy){ 
    		//alert('maxy');
    		//console.log('maxy ='+ maxy);
    		} else {
    	maxy = l.Y;
		
		grass  = n%2 ? grass1:grass2;
		rumble = n%2 ? rumble1:rumble2;
		road   = n%2 ? road1:road2;

		p = lines[n-1%N];
				
		if (p != null) {
		drawQuad(grass,    0, p.Y, width,    0,   l.Y, width);
		drawQuad(rumble, p.X, p.Y, p.W*1.18,  l.X, l.Y, l.W*1.18);
		drawQuad(road,   p.X, p.Y, p.W,      l.X, l.Y, l.W);
// 		console.log('road   '+ round(p.X) +'-'+ round(p.Y)+'-'+ round(p.W)+'    -    '+ round(l.X)+'-'+ round(l.Y)+'-'+ (l.W))
		}
		l.drawSprite(x);
		}	
	}
}

function keyPressed() {
	//alert('pressed');
  if (keyCode == LEFT_ARROW) {
    playerX -= 1;
  } else if (keyCode == RIGHT_ARROW) {
    playerX += 1;
  } else if (keyCode == UP_ARROW) {
    pos += 200;
  } else if (keyCode == DOWN_ARROW) {
    pos -= 200;
  }
  redraw();
}
