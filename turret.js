class Turret {
	constructor(x, y, w, h, toTrack) {
		this.abs = {};
		this.gun = {
			a: 0,
			x: 0,
			y: 0,
			w: 0,
			h: 0,
		};
		this.abs.x = x;
		this.abs.y = y;
		this.abs.w = w;
		this.abs.h = h;
		this.toTrack = toTrack;
		this.gun.a = 45;
		this.bullets = [];
		this.t = 0;
	}
	update(toTrack) {
		this.toTrack = toTrack;
		this.gun.w = this.abs.w;
		this.gun.h = 4;
		this.gun.x = (this.abs.x - this.abs.w / 2) + this.gun.w;
		this.gun.y = this.abs.y + this.abs.h / 2 - this.gun.h / 2;
		this.gun.a = Math.atan2((toTrack.y + toTrack.h / 2) - this.gun.y, (toTrack.x + toTrack.w / 2) - this.gun.x);
		if (this.t > 8) {
			this.bullets.push(new Bullet({
				x: this.gun.x,
				y: this.gun.y,
				w: 2,
				h: 2,
				a: this.gun.a,
			}, {
				color: 'white',
				speed: random(1, 4),
			}));
			this.t = 0;

		}
		this.t ++;
		for (var i = 0; i < this.bullets.length; i++) {
			this.bullets[i].update(toTrack);
			if (this.bullets[i].collided) {
				this.bullets.splice(i, 1);
			}
		}
		fillRect(this.abs.x, this.abs.y, this.abs.w, this.abs.h, 'white');
		fillRect(this.gun.x, this.gun.y, this.gun.w, this.gun.h, 'black', this.gun.a / Math.PI * 180, {
			x: this.gun.x,
			y: this.gun.y + this.gun.h / 2,
		});

	}
}