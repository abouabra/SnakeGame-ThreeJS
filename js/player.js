class Player {
	constructor() {
		this.pos = new THREE.Vector2(0, 0);
		this.isDead = false;
		this.tailGeometry = new THREE.BoxGeometry(1, 1, 1);
		this.tailMaterial = new THREE.MeshLambertMaterial({
			color: 0xffffff,
		});
		this.tail = [];

		this.tail.push(new THREE.Mesh(this.tailGeometry, this.tailMaterial));
		scene.add(this.tail[0]);
		for (let i = 1; i <= 4; i++) {
			this.grow();
		}
		this.snakeLen = 5;

		this.direction = "right"; // "up" "down" "left" "right"

		this.head = new THREE.Mesh(
			new THREE.BoxGeometry(1, 1, 1),
			new THREE.MeshLambertMaterial({
				color: 0x00ff00,
			})
		);
		this.head.material.color.setHex(0x00ff00);
		scene.add(this.head);

		this.pointLight = new THREE.PointLight(0x00ff00, 1, 20);
		this.pointLight.color.setHex(0x00ff00);
		scene.add(this.pointLight);
	}

	update() {
		if (this.isDead) {
			this.isDead = false;
			this.snakeLen = 5;
			for (let i = this.tail.length - 1; i >= 5; i--) {
				scene.remove(this.tail[i]);
				this.tail.pop();
			}

			this.pos.x = 0;
			this.pos.y = 0;
			updateScore(this.snakeLen - 5);
		}

		if (this.direction == "up") {
			this.pos.y++;
		}
		if (this.direction == "down") {
			this.pos.y--;
		}
		if (this.direction == "left") {
			this.pos.x--;
		}
		if (this.direction == "right") {
			this.pos.x++;
		}

		// if (this.pos.x > world.width / 2) {
		// 	this.pos.x = -world.width / 2;
		// }
		// if (this.pos.x < -world.width / 2) {
		// 	this.pos.x = world.width / 2;
		// }
		// if (this.pos.y > world.height / 2) {
		// 	this.pos.y = -world.height / 2;
		// }
		// if (this.pos.y < -world.height / 2) {
		// 	this.pos.y = world.height / 2;
		// }

		if (
			this.pos.x > world.width / 2 ||
			this.pos.x < -world.width / 2 ||
			this.pos.y > world.height / 2 ||
			this.pos.y < -world.height / 2
		) {
			this.isDead = true;
		}

		for (let i = 0; i <= this.tail.length - 1; i++) {
			if (
				this.tail[i].position.x == this.pos.x &&
				this.tail[i].position.y == this.pos.y
			) {
				this.isDead = true;
			}
		}
		if (food.position.x == this.pos.x && food.position.y == this.pos.y) {
			this.grow();
			this.snakeLen++;
			eatfood();
			updateScore(this.snakeLen - 5);
		}

		this.head.position.x = this.pos.x;
		this.head.position.y = this.pos.y;

		this.pointLight.position.set(this.pos.x, this.pos.y, 3);

		for (let i = this.tail.length - 1; i >= 1; i--) {
			let newPos = new THREE.Vector2(
				this.tail[i - 1].position.x,
				this.tail[i - 1].position.y
			);

			this.tail[i].position.x = newPos.x;
			this.tail[i].position.y = newPos.y;
		}

		this.tail[0].position.x = this.head.position.x;
		this.tail[0].position.y = this.head.position.y;
	}

	grow() {
		let cube = new THREE.Mesh(this.tailGeometry, this.tailMaterial);

		cube.position.x = 100;
		cube.position.y = 100;

		cube.castShadow = true;
		cube.receiveShadow = true;

		this.tail.push(cube);

		scene.add(this.tail[this.tail.length - 1]);
	}
}
