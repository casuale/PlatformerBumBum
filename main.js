let c = document.getElementById('c'),
	con = c.getContext("2d"),
	cw = c.width = 256,
	ch = c.height = 256,
	mapW = 32 * 16,
	mapH = 32 * 16,

	player = new Player(cw / 2 - 8, ch / 2 - 8, 16, 16),
	platforms = [
		new Platform(0, 0, 32, ch),
		new Platform(0, ch - 32, cw * 4, 128),
		new Platform(random(64, cw * 4), random(128, ch - 64), 64, 64),
		// new Platform(0, ch - 32, cw * 2, 128),

	],
	turrets = [],
	particles = [],
	grad = con.createLinearGradient(random(0, 256), random(0, 128), cw * 4, ch * 2);


	// for (var i = 0; i < TileMaps.map.layers[1].objects.length; i++) {
	// 	platforms.push(new Platform(TileMaps.map.layers[1].objects[i].x, TileMaps.map.layers[1].objects[i].y, TileMaps.map.layers[1].objects[i].width, TileMaps.map.layers[1].objects[i].height));
	// }
	// for (var i = 0; i < 10; i++) {
	// 	platforms.push(new Platform(random(16, cw * 6), random(16, ch - 32), random(32, 64), random(32, 64)));
	// }
	for (var i = 0; i < 16; i++) {
		turrets.push(new Turret(random(64, cw * 4), 200, random(8, 32), random(8, 32), player));
	}
	for (var i = 0; i < 10; i++) {
		particles.push(new Particle(player.x + 8 - cw / 2 + random(-128, cw+128), random(-180, 1), random(1,4), random(1,4),  0, 0, 140, `rgba(255, 255, 255, ${random(0, 1)})`, "snow"));
	}


function update() {
	// grad = con.createRadialGradient(player.x + 8, player.y + 8, 8, player.x + 8, player.y + 8, 32);

	// grad.addColorStop(1, 'rgba(10, 10, 50, 0.5)');
	// grad.addColorStop(0.2, 'rgba(30, 30, 30, 0.6)');
	// grad.addColorStop(0.1, 'rgba(0, 0, 50, 0.5)');

	fillRect(player.x - cw / 2 + 8, player.y - ch / 2 + 8, cw * 4, ch * 4, 'rgb(80, 80, 80)');
	// fillRect(player.x - cw / 2 + 8, player.y - ch / 2 + 8, cw, ch, grad);

	c.style.marginLeft = (window.innerWidth / 2 - cw / 2) + 'px';
	c.style.marginTop = (window.innerHeight / 2 - ch / 2) + 'px';

	player.update();
	

	for (var i = 0; i < platforms.length; i++) {
		platforms[i].update();
		// fillRect(random(0, cw * 8), random(0, 128), random(32, 64), random(32, 64));
	}
	if (turrets.length == 1)
		turrets[0].update(player);
	else {
		for (var i = 0; i < turrets.length; i++) {
			turrets[i].update(player);
		}
	}

	// for (var i = 0; i < particles.length; i++) {
	// 	particles[i].update();
	// 	particles[i].vx *= player.vx;
	// 	if (particles[i].y > player.y + 120)
	// 		particles[i].y = -random(8, 128),
	// 		particles[i].vy = random(0, 2),
	// 		particles[i].x = player.x + 8 - cw / 2 + random(0, cw);
	// 	if (particles[i].y <= player.y - 200)
	// 		particles[i].y = -random(8, 128);
	// 	if (particles[i].x + particles[i].w >= (player.x + 8 - cw / 2) + cw+8)
	// 		particles[i].x = -2;
	// }
	// con.filter = 'none';
	// fillRect(player.x - cw / 2 + 8, player.y - ch / 2 + 8, cw * 4, ch * 4, grad);

	webkitRequestAnimationFrame(update);
}

// con.scale(0.1, 0.1);
// con.translate(cw* 4, ch* 4);
// webkitRequestAnimationFrame(update);

document.querySelector("canvas").addEventListener('click', function() {
	c.webkitRequestFullscreen();
});

update();