
class Particle{
	constructor(x, y, w, h, l, r, c, color, type){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.vx = random(l, r);
		this.vy = 1;
		this.t = 0;
		if (c)
			this.c = c;
		else this.c = 20;
		this.speed = 3;
		if (type)
			this.type = type;
		this.p = '0123456789abcdef';
		this.opacity = 1;
		// this.col = '#' + this.p[Math.round(random(10, 16))] + this.p[Math.round(random(10, 16))] + this.p[Math.round(random(10, 16))];
		// if (color)
		// 	this.col = color;
		// else
			this.col = `rgba(255, 255, 255, ${this.vx})`;

	}
	update() {
		this.col = `rgba(255, 255, 255, ${this.opacity})`;
		if (this.type == 'snow') {
			this.x += Math.cos(this.vx);
			this.y += this.vy * 1.1;
			this.vy += 0.01;
			this.vx += 0.1 * this.vx;
		}
		else {
			this.x += -Math.cos(this.vx) * this.speed;
			this.y += -Math.sin(this.vy) * this.speed;
			this.vx -= 0.0001;
			this.vy += 0.0001;	
		}

		this.t += 1;
		this.opacity -= 0.05;
		fillRect(this.x, this.y, this.w, this.h, this.col, this.x);

	}
}