
class Platform{
	constructor(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.s = 2;
	}
	update() {
		if (rectCollision(player, this.x + this.s, this.y, this.w - this.s * 2, this.h / 2)) {
			if (!keyDown.space && player.onground) {
				player.vy = 0;
				player.gravity = 0;
			}
			if (player.y + player.h / 2 <= this.y) {
				player.onground = true;
				player.vy -= getDistance(player.y+player.h, this.y);				// }
			}
		}
		if (rectCollision(player, this.x + this.s, this.y + this.h - this.s, this.w - this.s * 2, this.s)) {
			player.vy = 1;
		}
		if (rectCollision(player, this.x, this.y + this.s, this.s, this.h - this.s * 2)) {
			if (keyDown.d | !keyDown.a | (keyDown.d & keyDown.a)) {
				player.vx = 0; 
			}
			if (player.y > this.y && player.y + player.h < this.y + this.h)
			player.x = this.x - player.w;
		}
		if (rectCollision(player, this.x + this.w - this.s, this.y + this.s, this.s, this.h - this.s * 2)) {
			if (keyDown.a | !keyDown.d | (keyDown.d & keyDown.a)) {
				player.vx = 0;
			}
			if (player.y > this.y && player.y + player.h < this.y + this.h)
				player.x = this.x + this.w;
		}

		// con.fillStyle = this.p;
		// con.fillRect(this.x, this.y, this.w, this.h);
		// con.fill();
		// repeatImage(this.x, this.y, this.w, this.h, 'tiles/tile4.png');
		fillRect(this.x, this.y, this.w, this.h, 'black');
		// drawImage(this.x, this.y, this.w, this.h, 'tiles.png');
		// strokeRect(this.x, this.y, this.w, this.h, 2, 'white');
		// fillRect(this.x + this.s, this.y, this.w - this.s * 2, this.h / 2, 'red')
		// fillRect(this.x, this.y + this.s, this.s, this.h - this.s * 2, 'red')
	}
}