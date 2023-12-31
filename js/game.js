let world = {
	width: 60,
	height: 60,
};

let backgroundPlane = new THREE.Mesh(
	new THREE.PlaneGeometry(world.width, world.height, world.width, world.height),
	new THREE.MeshPhongMaterial({
		// color: 0xffffff,
		color: 0x3e3e3e,
		// wireframe: true
	})
);
backgroundPlane.position.z = -1;
backgroundPlane.receiveShadow = true;
scene.add(backgroundPlane);

const BGFolder = GUI.addFolder("Background Plane");
BGFolder.add(backgroundPlane.material, "wireframe");

const borderUP = new THREE.Mesh(
	new THREE.BoxGeometry(world.width + 3, 1, 1),
	new THREE.MeshPhongMaterial({
		color: 0xffffff, // Object color
		// emissive: 0xffff00, // Emissive light color (red)
		// emissiveIntensity: 10, // Light intensity
	})
);
borderUP.position.y = world.height / 2 + 1;
borderUP.castShadow = true;
borderUP.receiveShadow = true;
// const borderUPLight = new THREE.PointLight(0xffffff, 1, 100);
// borderUPLight.position.set(0, world.height / 2 + 1, 3);
// scene.add(borderUPLight);
scene.add(borderUP);

const borderDOWN = borderUP.clone();
borderDOWN.position.y = -world.height / 2 - 1;
// const borderDOWNLight = borderUPLight.clone();
// borderDOWNLight.position.y = -world.height / 2 - 1;
// scene.add(borderDOWNLight);
// borderUP.receiveShadow = true;
// borderUP.castShadow = true;
scene.add(borderDOWN);

const borderLEFT = borderUP.clone();
borderLEFT.rotation.z = Math.PI / 2;
borderLEFT.position.x = -world.width / 2 - 1;
borderLEFT.position.y = 0;
// const borderLEFTLight = borderUPLight.clone();
// borderLEFTLight.position.x = -world.width / 2 - 1;
// borderLEFTLight.position.y = 0;
// scene.add(borderLEFTLight);
// borderLEFT.receiveShadow = true;
// borderLEFT.castShadow = true;
scene.add(borderLEFT);

const borderRIGHT = borderUP.clone();
borderRIGHT.rotation.z = Math.PI / 2;
borderRIGHT.position.x = world.width / 2 + 1;
borderRIGHT.position.y = 0;

// const borderRIGHTLight = borderUPLight.clone();
// borderRIGHTLight.position.x = world.width / 2 + 1;
// borderRIGHTLight.position.y = 0;
// scene.add(borderRIGHTLight);
// borderRIGHT.receiveShadow = true;
// borderRIGHT.castShadow = true;
scene.add(borderRIGHT);




// let ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
// scene.add(ambientLight);

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
