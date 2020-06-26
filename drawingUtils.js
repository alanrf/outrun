//draw a rectangle line
function drawQuad(color, x1, y1, w1, x2, y2, w2) {
	fill(color);
	strokeWeight(0);
	//console.log(x1-w1+'-'+y1+'-'+x2-w2+'-'+y2+'-'+x2+w2+'-'+y2+'-'+x1+w1+'-'+y1);
	quad(x1 - w1, y1, x2 - w2, y2, x2 + w2, y2, x1 + w1, y1);
}
function drawText(color, message, x, y) {
	textSize(32);
	fill(color);
	text(message, x, y);
}
function drawTextWithBorder(frontColor, backColor, message, x, y) {
	drawText(backColor, message, x, y);
	drawText(frontColor, message, x + 2, y + 2);
}
