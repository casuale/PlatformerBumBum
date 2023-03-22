let keyCode = {q: 81, w: 87, e: 69, r: 82, a: 65, s: 83, d: 68, space: 32, Control: 17, Shift: 16, Alt: 18, Enter: 13, n1: 49, n2: 50, n3: 51, n4: 52, n5: 53, n6: 54, n7: 55, n8: 56, n9: 57, n0: 48},
	keyDown = {
		q: false,
		w: false,
		e: false,
		r: false,
		a: false,
		s: false,
		d: false,
		space: false,
		Control: false,
		Shift: false,
		Alt: false,
		Enter: false,
		n1: false,
		n2: false,
		n3: false,
		n4: false,
		n5: false,
		n6: false,
		n7: false,
		n8: false,
		n9: false,
		n0: false,
	},
	keyUp = {
		q: false,
		w: false,
		e: false,
		r: false,
		a: false,
		s: false,
		d: false,
		space: false,
		Control: false,
		Shift: false,
		Alt: false,
		Enter: false,
		n1: false,
		n2: false,
		n3: false,
		n4: false,
		n5: false,
		n6: false,
		n7: false,
		n8: false,
		n9: false,
		n0: false,
	},
	keydown = false,
	keyup = false;

function rectCollision(type, x1, y1, w1, h1, x2, y2, w2, h2) {
	if (type != 'basic') {
		if (type.x + type.w >= x1 & type.x <= x1 + w1 & type.y + type.h >= y1 & type.y <= y1 + h1) 
			return true;
		else return false;
	}
	if(type == 'basic') {
		if (x1 + w1 >= x2 & x1 <= x2 + w2 & y1 + h1 >= y2 & y1 <= y2 + h2) 
			return true;
		else return false;
	}
}

function getDistance(x1, x2) {
	return Math.sqrt(Math.pow(x1 - x2, 2));
}
function random(min, max) {
	return Math.random() * max + min;
}

function fillRect(x, y, w, h, c, a, rotatePoint) {
	// let img = new Image(),
	// 	palette;
	// img.src = 'player.png';
	// pallette = con.createPattern(img, 'repeat');

	con.save();
	if (rotatePoint) {
		con.translate(rotatePoint.x, rotatePoint.y);
		con.rotate((a / 180 * Math.PI));
		con.translate(-rotatePoint.x, -rotatePoint.y);
	}
	else {
		con.translate(x + w / 2, y + h / 2);
		con.rotate((a / 180 * Math.PI));
		con.translate(-x + -w / 2, -y + -h / 2);
	}

	con.fillStyle = c;
	con.fillRect(x, y, w, h);
	con.fill();
	con.restore();
}

function strokeRect(x, y, w, h, s, c, a) {
	
	con.save();

	con.translate(x + w / 2, y + h / 2);
	con.rotate((a / 180 * Math.PI));
	con.translate(-x + -w / 2, -y + -h / 2);

	con.strokeStyle = c;
	con.lineWidth = s;
	con.strokeRect(x, y, w, h);
	con.stroke();
	con.restore();
}

function arc(x, y, r, c, type, s, a) {
	
	con.save();

	con.translate(x, y);
	con.rotate((a / 180 * Math.PI));
	con.translate(-x, -y);

	if (type == 'fill') {
		con.fillStyle = c;
		con.beginPath();
		con.arc(x, y, r, 0, Math.PI * 2);
		con.fill();
	}
	if (type == 'stroke') {
		con.strokeStyle = c;
		con.lineWidth = s;
		con.arc(x, y, r, 0, Math.PI * 2);
		con.stroke();
	}
	con.restore();
}

function drawImage(x, y, w, h, src, a) {
	let img = new Image(),
		contextImage = c.getContext('2d');
	img.src = src;
	contextImage.imageSmoothingEnabled = false;
	con.save();

	con.translate(x, y);
	con.rotate((a / 180 * Math.PI));
	con.translate(-x, -y);

	contextImage.drawImage(img, x, y, w, h);
	
	con.restore();
}
function drawSprite(x1, y1, w1, h1, x, y, w, h, src, a) {
	let img = new Image(),
		contextImage = c.getContext('2d');
	img.src = src;
	contextImage.imageSmoothingEnabled = false;
	con.save();

	con.translate(x, y);
	con.rotate((a / 180 * Math.PI));
	con.translate(-x, -y);

	contextImage.drawImage(img, x1, y1, w1, h1, x, y, w, h);
	
	con.restore();
}
class SpriteImage{
	constructor(p) {
		this.img = new Image();
		this.t = 0;
		this.contextImage = c.getContext('2d');
		this.p = p;
	}
	update(x, y, w, h, src, a, vx, vy) {
		this.contextImage.imageSmoothingEnabled = false;
		this.img.src = src;

		if (this.t > this.p.fps) {
			if (this.p.left & this.p.play) {
				this.p.pos.x += this.p.s.w;
				if (this.p.pos.x + this.p.s.w > this.p.max.x)
					this.p.pos.x = this.p.oldPos.x;
			}
			else if (this.p.top & this.p.play) {
				this.p.pos.y += this.p.s.h;
				if (this.p.pos.y + this.p.s.h > this.p.max.y)
					this.p.pos.y = this.p.oldPos.y;
			}
			this.t = 0;
		}
		this.t++;
		// contextImage.translate(-vx, -vy);
		// pallette = con.createPattern(canvasImage, 'no-repeat');

		con.save();

		con.translate(x + w / 2, y + h / 2);
		con.rotate((a / 180 * Math.PI));
		con.translate(-x - w / 2, -y - h / 2);
		
		this.contextImage.save();
		this.contextImage.translate(x, y);
		this.contextImage.scale(1, 1);
		this.contextImage.translate(-x, -y);
		this.contextImage.drawImage(this.img, this.p.pos.x, this.p.pos.y, this.p.s.w, this.p.s.h, x, y, w, h);
		this.contextImage.restore();
		// con.fillStyle = pallette;
		// con.fillRect(x, y, w, h);
		// con.fill();

		
		con.restore();
	}
}
function repeatImage(x, y, w, h, src, a) {
	let img = new Image(),
		contextImage = c.getContext('2d');
		img.src = src;

		
		con.save();

		con.translate(x + w / 2, y + h / 2);
		con.rotate((a / 180 * Math.PI));
		con.translate(-x - w / 2, -y - h / 2);
		
		con.fillStyle = contextImage.createPattern(img, 'repeat');
		con.fillRect(x, y, w, h);
		con.fill();
		
		con.restore();
	}
document.addEventListener('keyup', function(e) {
	keydown = false;
	keyup = true;

	switch(e.keyCode) {
		case keyCode.q:
			keyUp.q = true;
			keyDown.q = false;
		break;
		case keyCode.w:
			keyUp.w = true;
			keyDown.w = false;
		break;
		case keyCode.e:
			keyUp.e = true;
			keyDown.e = false;
		break;
		case keyCode.r:
			keyUp.r = true;
			keyDown.r = false;
		break;
		case keyCode.a:
			keyUp.a = true;
			keyDown.a = false;
		break;
		case keyCode.s:
			keyUp.s = true;
			keyDown.s = false;
		break;
		case keyCode.d:
			keyUp.d = true;
			keyDown.d = false;
		break;
		case keyCode.space:
			keyUp.space = true;
			keyDown.space = false;
		break;
		case keyCode.Shift:
			keyUp.Shift = true;
			keyDown.Shift = false;
		break;
		case keyCode.Alt:
			keyUp.Alt = true;
			keyDown.Alt = false;
		break;
		case keyCode.Control:
			keyUp.Control = true;
			keyDown.Control = false;
		break;
		case keyCode.Enter:
			keyUp.Enter = true;
			keyDown.Enter = false;
		break;
		case keyCode.n1:
			keyUp.n1 = true;
			keyDown.n1 = false;
		break;
		case keyCode.n2:
			keyUp.n2 = true;
			keyDown.n2 = false;
		break;
		case keyCode.n3:
			keyUp.n3 = true;
			keyDown.n3 = false;
		break;
		case keyCode.n4:
			keyUp.n4 = true;
			keyDown.n4 = false;
		break;
		case keyCode.n5:
			keyUp.n5 = true;
			keyDown.n5 = false;
		break;
		case keyCode.n6:
			keyUp.n6 = true;
			keyDown.n6 = false;
		break;
		case keyCode.n7:
			keyUp.n7 = true;
			keyDown.n7 = false;
		break;
		case keyCode.n8:
			keyUp.n8 = true;
			keyDown.n8 = false;
		break;
		case keyCode.n9:
			keyUp.n9 = true;
			keyDown.n9 = false;
		break;
		case keyCode.n0:
			keyUp.n0 = true;
			keyDown.n0 = false;
		break;

	}
});document.addEventListener('keydown', function(e) {
	keydown = true;
	keyup = false;

	switch(e.keyCode) {
		case keyCode.q:
			keyDown.q = true;
			keyUp.q = false;
		break;
		case keyCode.w:
			keyDown.w = true;
			keyUp.w = false;
		break;
		case keyCode.e:
			keyDown.e = true;
			keyUp.e = false;
		break;
		case keyCode.r:
			keyDown.r = true;
			keyUp.r = false;
		break;
		case keyCode.a:
			keyDown.a = true;
			keyUp.a = false;
		break;
		case keyCode.s:
			keyDown.s = true;
			keyUp.s = false;
		break;
		case keyCode.d:
			keyDown.d = true;
			keyUp.d = false;
		break;
		case keyCode.space:
			keyDown.space = true;
			keyUp.space = false;
		break;
		case keyCode.Shift:
			keyDown.Shift = true;
			keyUp.Shift = false;
		break;
		case keyCode.Alt:
			keyDown.Alt = true;
			keyUp.Alt = false;
		break;
		case keyCode.Control:
			keyDown.Control = true;
			keyUp.Control = false;
		break;
		case keyCode.Enter:
			keyDown.Enter = true;
			keyUp.Enter = false;
		break;
		case keyCode.n1:
			keyDown.n1 = true;
			keyUp.n1 = false;
		break;
		case keyCode.n2:
			keyDown.n2 = true;
			keyUp.n2 = false;
		break;
		case keyCode.n3:
			keyDown.n3 = true;
			keyUp.n3 = false;
		break;
		case keyCode.n4:
			keyDown.n4 = true;
			keyUp.n4 = false;
		break;
		case keyCode.n5:
			keyDown.n5 = true;
			keyUp.n5 = false;
		break;
		case keyCode.n6:
			keyDown.n6 = true;
			keyUp.n6 = false;
		break;
		case keyCode.n7:
			keyDown.n7 = true;
			keyUp.n7 = false;
		break;
		case keyCode.n8:
			keyDown.n8 = true;
			keyUp.n8 = false;
		break;
		case keyCode.n9:
			keyDown.n9 = true;
			keyUp.n9 = false;
		break;
		case keyCode.n0:
			keyDown.n0 = true;
			keyUp.n0 = false;
		break;

	}
});