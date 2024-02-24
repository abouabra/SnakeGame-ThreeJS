let world = {
	width: 60,
	height: 60,
};

let backgroundPlane = new THREE.Mesh(
	new THREE.PlaneGeometry(world.width, world.height, world.width, world.height),
	new THREE.MeshPhongMaterial({
		color: 0x3e3e3e,
	})
);
backgroundPlane.position.z = -1;
backgroundPlane.receiveShadow = true;
scene.add(backgroundPlane);

const borderUP = new THREE.Mesh(
	new THREE.BoxGeometry(world.width + 3, 1, 1),
	new THREE.MeshPhongMaterial({
		color: 0xffffff, // Object color
	})
);
borderUP.position.y = world.height / 2 + 1;
borderUP.castShadow = true;
borderUP.receiveShadow = true;
scene.add(borderUP);

const borderDOWN = borderUP.clone();
borderDOWN.position.y = -world.height / 2 - 1;
scene.add(borderDOWN);

const borderLEFT = borderUP.clone();
borderLEFT.rotation.z = Math.PI / 2;
borderLEFT.position.x = -world.width / 2 - 1;
borderLEFT.position.y = 0;
scene.add(borderLEFT);

const borderRIGHT = borderUP.clone();
borderRIGHT.rotation.z = Math.PI / 2;
borderRIGHT.position.x = world.width / 2 + 1;
borderRIGHT.position.y = 0;

scene.add(borderRIGHT);



let player = new Player();
let controller = new Controller();
let clock = new THREE.Clock(true);
let food = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1),
	new THREE.MeshLambertMaterial({
		color: 0xff0000,
	})
);
scene.add(food);
food.castShadow = true;

let foodLight = new THREE.PointLight(0xff0000, 1, 20);
scene.add(foodLight);

function setup() {
	eatfood();
}

function eatfood() {
	let foundFood = false;
	while (!foundFood) {
		food.position.x = Math.round(Math.random() * world.width - world.width / 2);
		food.position.y = Math.round(
			Math.random() * world.height - world.height / 2
		);

		foodLight.position.set(food.position.x, food.position.y, 3);

		for (let i = 0; i < player.tail.length; i++) {
			if (
				player.tail[i].position.x == food.position.x &&
				player.tail[i].position.y == food.position.y
			) {
				foundFood = false;
				break;
			} else {
				foundFood = true;
			}
		}
	}
}
let isPaused = false;
function gameLoop() {
	requestAnimationFrame(gameLoop);
	stats.begin();
	update();
	renderer.render(scene, camera);
	stats.end();
}

function update() {
	controller.update();

	if (controller.uparrow) {
		if (player.direction == "down") {
			player.direction = "down";
		} else {
			player.direction = "up";
		}
	}
	if (controller.downarrow) {
		if (player.direction == "up") {
			player.direction = "up";
		} else {
			player.direction = "down";
		}
	}
	if (controller.leftarrow) {
		if (player.direction == "right") {
			player.direction = "right";
		} else {
			player.direction = "left";
		}
	}
	if (controller.rightarrow) {
		if (player.direction == "left") {
			player.direction = "left";
		} else {
			player.direction = "right";
		}
	}
	if (clock.getElapsedTime() > 0.09) {
		player.update();
		clock.start();
	}
}

setup();
gameLoop();
