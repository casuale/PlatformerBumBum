class Bullet{
	constructor(abs, type) {
		this.abs = abs;
		this.type = type;
		this.collided = false;
	}
	update(toTrack) {
		this.abs.x += Math.cos(this.abs.a) * this.type.speed;
		this.abs.y += Math.sin(this.abs.a) * this.type.speed;
		if (rectCollision("basic", toTrack.x, toTrack.y, toTrack.w, toTrack.h, this.abs.x, this.abs.y, this.abs.w, this.abs.h) || this.abs.x <= toTrack.x - 128 || this.abs.x >= toTrack.x + 256 || this.abs.y <= toTrack - 128 || this.abs.y >= toTrack.y + 256) {
			this.collided = true;
		}

		fillRect(this.abs.x, this.abs.y, this.abs.w, this.abs.h, this.type.color, this.abs.a);
	}
}